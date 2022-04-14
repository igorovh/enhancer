import { Module } from '../module.js';

export const clipModule = new Module('clip', callback);

function callback(element) {
    if(!window.location.href.includes('clips.twitch.tv') && !window.location.href.includes('/clip/')) return;
    element.setAttribute('twitch-enhancer', '');
    createButton(element);
}

function createButton(element) {
    const controls = element.querySelector('.player-controls__left-control-group');
    const button = document.createElement('a');
    const link = 'https://clipr.xyz/';
    button.href = createLink();
    button.target = '_blank'
    button.rel = 'noopener noreferrer'
    button.innerHTML = 'Download clip!'
    button.id = 'te-clip-download';
    button.className = 'te-video-button';
    controls.appendChild(button);
}

function createLink() {
    return 'https://clipr.xyz/' + getClipId();
}

function getClipId() {
    const url = new URL(window.location.href);
    return url.pathname.split('/').reverse()[0];
}