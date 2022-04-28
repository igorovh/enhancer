import { Module } from '../module.js';
import { logger } from '../../utils/logger.js';
import { getChatMessage, getChatService, getChat, getChatMessagesById } from '../../utils/twitch.js';
import { tooltip } from '../../utils/tooltip.js';
import { honors } from '../../data/honors.js';


export const chatBumpingModule = new Module('chatMessages', callback);

async function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    
    // For second stage testing
    if(honors.find(honor => honor.name === getChat().props.currentUserDisplayName.toLowerCase()) === undefined) {
        if(!await canTest()) return;
    } else logger.debug('You have honor, so bumping will work everytime.');
    
    const callback = (mutationList, observer) => {
        for(const mutation of mutationList) {
            if(mutation.type === 'childList' && mutation.addedNodes) {
                for(const message of mutation.addedNodes) {
                    checkMessage(message);
                }
            }
        }
    }
    const chatObserver = new MutationObserver(callback);
    chatObserver.observe(element, { attributes: true, childList: true });
    logger.info('Chat bumping observer started.');
}

async function canTest() {
    const data = await fetch('https://wcapi.vopp.top/tests');
    const json = await data.json();
    return json.chatBumpingModule.includes(getChat().props.channelLogin.toLowerCase());
}

function checkMessage(element) {
    const message = getChatMessage(element);
    if(!message) return;

    const messageContent = message.props?.message?.messageBody;
    const regex = /[a-zA-Z0-9]/gm;
    if(messageContent && messageContent.includes('^') && message.props.message.reply && !regex.test(messageContent)) {
        element.style.display = 'none';
        const id = message.props.reply.parentMsgId;
        const bumpElement = getChatMessagesById(id)[0].element;
        if(!bumpElement) {
            return;
        } 
        const bumps = addBump(bumpElement);
        showBumps(bumps, bumpElement, id);
    }
    if(getChat().props.currentUserLogin !== message.props?.message?.user?.userLogin) createBumpButton(element, message.props?.message?.id);
}

function createBumpButton(element, id) {
    element.style.position = 'relative';
    let canBump = true;
    const bumpButton = document.createElement('div');
    bumpButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1.7rem" height="1.7rem" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"/></svg>`;
    bumpButton.className = 'te-bump-button';
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = 'te-bump-button-wrapper';
    tooltip(buttonWrapper, `te-bump-button-${id}`);
    buttonWrapper.appendChild(bumpButton);
    buttonWrapper.innerHTML += `<span class="te-tooltip te-bump-button-${id} te-tooltip-left" style="top: 0.25rem">Bump this message</span>`;
    buttonWrapper.addEventListener('click', () => {
        if(canBump) sendBump(id, element);
        canBump = false;
        buttonWrapper.querySelector(`.te-bump-button`).style = 'cursor: no-drop; opacity: 0.5';
        buttonWrapper.querySelector(`.te-bump-button-${id}`).textContent = "You've already bumped this message";
    });
    element.appendChild(buttonWrapper);
}

function addBump(message) {
    let bumps = 1;
    if(message.hasAttribute('te-bumps')) {
        bumps += parseInt(message.getAttribute('te-bumps'));
    }
    message.setAttribute('te-bumps', bumps);
    return bumps;
}

function showBumps(amount, element, id) {
    if(element.querySelector('.te-bumps')) element.querySelector('.te-bumps').remove();
    const messageContent = element.querySelector('.message') || element.querySelector('.seventv-message-context') || element.querySelector('span[data-test-selector="chat-line-message-body"]');
    const bumpsElement = document.createElement('div');
    bumpsElement.className = 'te-bumps';
    messageContent.appendChild(bumpsElement);
    
    bumpsElement.innerHTML = '+' + amount + `<span class="te-tooltip te-bump-${id} te-tooltip-top">Bumps</span>`;

    tooltip(bumpsElement, `te-bump-${id}`);

    return bumpsElement;
}

async function sendBump(messageId, message) {
    getChatService().client.connection.ws.send(`@reply-parent-msg-id=${messageId} PRIVMSG #${getChat().props.channelLogin} :^`);

    if(message) showBumps(addBump(message), message, messageId);
}