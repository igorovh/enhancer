import { Module } from '../module.js';

export const chatButtonModule = new Module('chatButtons', callback);

function callback(element) {
    console.log('found');
    element.setAttribute('twitch-enhancer', '');
    const buttons = element.lastChild;
    const settings = document.createElement('img');
    img.src = ''; //TODO Communicate with background scirpt
    buttons.insertBefore(settings, buttons.lastChild);
}