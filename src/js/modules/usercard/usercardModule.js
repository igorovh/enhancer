import { Module } from '../module.js';
import { fixName } from '../../utils/name.js';
import { getName } from '../../utils/url.js';
import { honors } from '../../data/honors.js';
import { logger } from '../../utils/logger.js';

export const usercardModule = new Module('usercard', callback);

function callback(element) {
    logger.info('Found user card.');
    element.setAttribute('twitch-enhancer', '');
    let username = element.getElementsByClassName('ScCoreLink-sc-udwpw5-0 AKPzc tw-link')[0]?.textContent.toLowerCase() || 
        element.getElementsByClassName('ScCoreLink-sc-udwpw5-0 itEAmU tw-link')[0]?.textContent.toLowerCase();
    username = fixName(username);
    const cardWrapper = document.createElement('div');
    cardWrapper.id = 'te-card-wrapper';
    element.insertBefore(cardWrapper, element.children[1]);
    createWatchtime(username, cardWrapper);
    createHonors(username, cardWrapper);
    createKonfident(username, cardWrapper);
}

async function createWatchtime(username, cardWrapper) {

}

async function createHonors(username) {
    const honor = honors.find(honor => honor.name.toLowerCase() === username);
    if(!honor) return;
    cardWrapper.innerHTML += `
        <div id="te-card-honor">
            ${honor.type === 'permanent' ? '<div class="te-card-line" style="font-weight: bold; font-size: 10px;">THANKS, FOR:</div>' : ''}
            <div class="te-card-line">${honor.description}</div>
            <div class="te-card-line"><div class="te-card-separator"></div></div>
        </div>
    `;
}

async function createKonfident(username, cardWrapper) {
    const name = getName(window.location.href).toLowerCase();
    cardWrapper.innerHTML += `
        <div id="te-card-konfident">
            <div class="te-card-line">View latest chat logs by clicking here:</div>
            <a target="_blank" href="https://konfident.vopp.top/latest/?streamer=${name}&username=${username}"><div class="xayo-line xayo-header">konfident.vopp.top</div></a>
        </div>
    `;
}