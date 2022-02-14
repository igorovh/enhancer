import { Module } from '../module.js';

export const videoModule = new Module('video', callback);

let timeSpan;
let videoElement;

function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    createTime(element);
}

function createTime(element) {
    const controls = document.querySelector('.player-controls__left-control-group');
    if(!controls) return;
    videoElement = element.querySelector('video');
    timeSpan = document.createElement('span');
    
}

function getTime(date) {
    return date.toLocaleTimeString();
}

function getCurrentVideoTime() {
    return videoElement.currentTime;
}

function getCurrentTime() {
    return new Date(startDate.getTime() + (getCurrentVideoTime() * 1000));
}