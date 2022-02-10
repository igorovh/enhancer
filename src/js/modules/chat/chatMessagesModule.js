import { Module } from '../module.js';
import { logger } from '../../utils/logger.js';
import { localBadges } from '../../data/badges.js';
import { openDatabase, getUser, addUser } from '../../utils/chatDatabase.js';
import { getName } from '../../utils/url.js';
import { addText } from '../../utils/chatInput.js'; 

export const chatMessagesModule = new Module('chatMessages', callback);

function callback(element) {
    openDatabase();
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
    startUsersInterval();
}

async function prepareMessage(message) {
    let name = message.querySelector('.chat-line__username')?.textContent.toLowerCase();
    if(!name) return;
    if(name.includes('(')) name = name.substring(name.indexOf('(') + 1, name.indexOf(')'));
    const badgesElement = message.querySelector('.chat-line__username-container')?.children[0] || message.querySelector('.chat-line__message--badges');
    badgesElement.classList.add(`te-${name}-badges`);
    badgesElement.setAttribute('username', name);
    const badgesList = [];

    let viewerBadge = await checkViewerBadges(name);
    if(viewerBadge?.streamer?.badge) viewerBadge = fixType(viewerBadge);
    if(viewerBadge) badgesList.push(viewerBadge);

    const localBadges = checkLocalBadges(name);
    if(localBadges.length > 0) badgesList.push(...localBadges);
    
    if(badgesList.length > 0) addBadges(badgesElement, badgesList);
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
        image.addEventListener('click', mentionBadge, false);
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
    const title = `${streamer} ${suffix ? suffix : ''}`;
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

function mentionBadge(event) {
    console.log(event.srcElement.parentElement)
    const name = event.srcElement.parentElement.getAttribute('username');
    const streamer = event.srcElement.getAttribute('streamer');
    const suffix = event.srcElement.getAttribute('suffix');
    addText(`@${name} - ${streamer} ${suffix ? suffix : 'Viewer'}`, true);
}

let users = [];
let block = 0;

async function checkViewerBadges(name) {
    const cacheUser = await getUser(name);
    if(cacheUser && !cacheUser.error) return cacheUser;
    if(cacheUser.error === 418) return;
    if(!users.includes(name)) users.push(name);
    return;
}

function fixType(user) {
    return {
        name: user.name,
        badge: user.streamer.badge,
        streamer: user.streamer.streamer
    }
}

function startUsersInterval() {
    setInterval(async () => {
        if(users.length < 1) return;
        if(block >= Date.now()) return;
        let names = users.pop();
        if(users.length > 25) {
            names = users.slice(0, 100).join(',');
            block = Date.now() + 10000;
            logger.warn('Blocking users interval for 10 seconds.');
        }
        const channel = getName(window.location.href);
        logger.log(`Downloading new users: ${names}`);
        const data = await fetch(`https://teapi.vopp.top/chat/${names}?channel=${channel}`);
        const json = await data.json();
        for(const user of json) {
            const cacheUser = {
                name: user.login,
                badge: user.watchtimes[0].streamer.profileImageUrl,
                streamer: user.watchtimes[0].streamer.displayName
            }
            addUser(cacheUser);
            users = users.filter(name => name !== cacheUser.name);
            document.querySelectorAll(`.te-${cacheUser.name}-badges`).forEach(badgeElement => addBadges(badgeElement, Array.of(cacheUser)));
        }
    }, 1000);
    logger.info('Users interval started.');
}