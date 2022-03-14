import { Module } from '../module.js';
import { logger } from '../../utils/logger.js';
import { localBadges } from '../../data/badges.js';
import { openDatabase, getUser, addUser } from '../../utils/chatDatabase.js';
import { addText } from '../../utils/chatInput.js'; 
import { honors } from '../../data/honors.js';
import { customIcons } from '../../data/customIcons.js';
import { groups } from '../../data/groups.js';
import { twitchEnhancer } from '../../main.js'; 

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
    const nameElement = message.querySelector('.chat-line__username');
    if(!nameElement) return;
    let name = nameElement.textContent.toLowerCase();
    if(name.includes('(')) name = name.substring(name.indexOf('(') + 1, name.indexOf(')'));
    nameElement.setAttribute('username', name);
    nameElement.addEventListener('contextmenu', mentionName);
    const badgesElement = message.querySelector('.chat-line__username-container')?.children[0] || message.querySelector('.chat-line__message--badges');
    badgesElement.classList.add(`te-${name}-badges`);
    badgesElement.setAttribute('username', name);
    const badgesList = [];

    if(honors.find(honor => honor.name.toLowerCase() === name.toLowerCase())) setHonor(nameElement);

    let viewerBadge = await checkViewerBadges(name);
    if(viewerBadge?.streamer?.badge) viewerBadge = fixType(viewerBadge);

    if(viewerBadge) {
        if(twitchEnhancer.settings.te_group_badges) {
            const groupBadge = groups.find(group => group.streamers.includes(viewerBadge.streamer.toLowerCase()));
            if(groupBadge) {
                viewerBadge.suffix = `(${viewerBadge.streamer})`;
                viewerBadge.streamer = groupBadge.name;
                viewerBadge.badge = groupBadge.icon;
                viewerBadge.type = 'group';
            }
        }

        const customIcon = customIcons.find(icon => icon.name.toLowerCase() === viewerBadge.streamer.toLowerCase());
        if(customIcon) viewerBadge.badge = customIcon.icon;
        if(twitchEnhancer.settings.te_group_badges && !twitchEnhancer.settings.te_viewer_badges && viewerBadge.type === 'group') badgesList.push(viewerBadge);
        else if(twitchEnhancer.settings.te_viewer_badges) badgesList.push(viewerBadge);
    }

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
        image.addEventListener('mouseenter', showPopup);
        image.addEventListener('mouseleave', hidePopup);
        image.addEventListener('click', mentionBadge);
        image.addEventListener('contextmenu', mentionBadge);
        badgeElement.classList.remove(`te-${badge.name}-badges`);
    }
}

function setHonor(nameElement) {
    const color = nameElement.style.color || nameElement.firstChild.firstChild.style.color || 'white';
    nameElement.style.textShadow = `${color} 0 0 10px`;
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

function mentionName(event) {
    let name = event.srcElement.parentElement.getAttribute('username');
    if(!name) name = event.srcElement.parentElement.parentElement.getAttribute('username');
    addText(`@${name} `, true, true);
    event.preventDefault();
}

function mentionBadge(event) {
    const name = event.srcElement.parentElement.getAttribute('username');
    const streamer = event.srcElement.getAttribute('streamer');
    const suffix = event.srcElement.getAttribute('suffix');
    addText(`@${name} - ${streamer} ${suffix ? suffix : 'Viewer'} `, true, true);
    event.preventDefault();
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
        let names = users.shift();
        if(users.length > 25) {
            names = users.splice(0, 100).sort().join(',');
            block = Date.now() + 10000;
            logger.warn('Blocking users interval for 10 seconds.');
        }
        const data = await fetch(`https://teapi.vopp.top/chat/${names}`);
        const json = await data.json();
        for(const user of json) {
            const cacheUser = {
                name: user.login,
                badge: user.watchtimes[0].streamer.profileImageUrl,
                streamer: user.watchtimes[0].streamer.displayName
            }
            addUser(cacheUser, user.cache * 1000);
            //document.querySelectorAll(`.te-${cacheUser.name}-badges`).forEach(badgeElement => addBadges(badgeElement, Array.of(cacheUser))); Because of not updating group
        }
    }, 1000);
    logger.info('Users interval started.');
}