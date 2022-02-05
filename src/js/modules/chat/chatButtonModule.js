import { Module } from '../module.js';
import { getFile } from '../../utils/file.js';

export const chatButtonModule = new Module('chatButtons', callback);

function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    const buttons = element.lastChild;
    const settings = document.createElement('img');
    settings.title = 'TwitchEnhancer Settings'
    settings.id = 'te-settings-button'
    settings.src = getFile('img/icon.png');
    settings.addEventListener('click', showSettings)
    buttons.insertBefore(settings, buttons.lastChild);
}

function showSettings() {
    window.open(getFile('html/options/options.html'));
    console.log('[te]', getFile('html/options/options.html'));
}