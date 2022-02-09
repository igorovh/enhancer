import { Module } from '../module.js';
import { logger } from '../../utils/logger.js';
import { localBadges } from '../../data/badges.js';

export const chatMessagesModule = new Module('chatMessages', callback);

function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    const callback = (mutationList, observer) => {
        for(const mutation of mutationList) {
            if(mutation.type === 'childList' && mutation.addedNodes) {
                for(const message of mutation.addedNodes) {
                    prepareMessage(message);
                }
            }
        }
    }
    const chatObserver = new MutationObserver(callback);
    chatObserver.observe(element, { attributes: true, childList: true });
    logger.info('Chat messages observer started.');
}

function prepareMessage(message) {
    let name = message.querySelector('.chat-line__username')?.textContent.toLowerCase();
    if(!name) return;
    if(name.includes('(')) name = name.substring(name.indexOf('(') + 1, name.indexOf(')'));
    const badgesElement = message.querySelector('.chat-line__username-container')?.children[0] || message.querySelector('.chat-line__message--badges');
    badgesElement.classList.add(`te-${name}-badges`);
    const badgesList = [];
    //Add Viewer Badge
    const localBadges = checkLocalBadges(name);
    if(localBadges.length > 0) badgesList.push(...localBadges);
    addBadges(badgesElement, badgesList);
    console.log(localBadges);
}

function checkLocalBadges(name) {
    const returnBadges = [];
    for(const badge of localBadges) {
        if(badge.name === name) returnBadges.push(badge);
    }
    return returnBadges;
}

function addBadges(badgeElement, badgesList) {
    for(const badge of badgesList) {
        const image = new Image();
        image.onload = () => {
            if(badgeElement.children.length < 1) badgeElement.appendChild(image);
            else badgeElement.insertBefore(image, badgeElement.firstChild);
        };
        image.src = badge.badge;
        image.className = 'chat-badge viewer-badge ffz-badge';
        image.setAttribute('streamer', badge.streamer);
        if(badge.suffix) image.setAttribute('suffix', badge.suffix);
        image.addEventListener('mouseenter', showPopup, false);
        image.addEventListener('mouseleave', hidePopup, false);
        badgeElement.classList.remove(`te-${badge.name}-badges`);
    }
}

function showPopup(event) {
    let popup = document.querySelector('#te-badge-popup');
    if(popup) popup.remove();
    popup = document.createElement('div');
    popup.id = 'te-badge-popup';
    const streamer = event.srcElement.getAttribute('streamer');
    const suffix = event.srcElement.getAttribute('suffix');
    const title = `${streamer} ${suffix ? suffix : 'Viewer'}`;
    popup.innerHTML += `<img src="${event.srcElement.src}" alt="${streamer}">`;
    popup.innerHTML += `<br /><span>${title}</span>`;
    let y = event.pageY - 50;
    popup.style.top = (y < 0 ? 0 : y) + 'px';
    popup.style.left = (event.pageX + 25) + 'px';
    document.getElementById('root').children[0].appendChild(popup);
}

function hidePopup() {
    const popup = document.querySelector('#te-badge-popup');
    if(!popup) return;
    popup.remove();
}