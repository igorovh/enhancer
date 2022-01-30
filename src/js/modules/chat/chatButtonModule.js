import { Module } from '../module.js';
import { getFile } from '../../utils/file.js';

export const chatButtonModule = new Module('chatButtons', callback);

function callback(element) {
    console.log('found');
    element.setAttribute('twitch-enhancer', '');
    const buttons = element.lastChild;
    const settings = document.createElement('img');
    settings.title = 'TwitchEnhancer Settings'
    settings.id = 'te-settings-button'
    settings.src = getFile('img/icon.png');
    buttons.insertBefore(settings, buttons.lastChild);
}