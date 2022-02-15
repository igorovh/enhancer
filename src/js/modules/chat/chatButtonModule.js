import { Module } from '../module.js';
import { getFile } from '../../utils/file.js';

export const chatButtonModule = new Module('chatButton', callback);

function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    const settings = document.createElement('img');
    settings.title = 'TwitchEnhancer Settings'
    settings.id = 'te-settings-button'
    settings.className = 'Layout-sc-nxg1ff-0 ipHOpR';
    settings.src = getFile('img/icon.png');
    settings.addEventListener('click', showSettings)
    element.insertBefore(settings, element.firstChild)
}

function showSettings() {
    window.open(getFile('html/options/options.html'));
}