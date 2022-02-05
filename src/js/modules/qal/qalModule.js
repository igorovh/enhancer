import { Module } from '../module.js';
import { getName } from '../../utils/url.js';
import { qal } from '../../data/qal.js';

export const qalModule = new Module('qal', callback);

function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    createLinks(element);
}

function createLinks(element) {
    const buttonsWrapper = document.createElement('div');
    element.appendChild(buttonsWrapper);
    buttonsWrapper.id = 'te-buttons-wrapper';
    let buttons = [];
    const name = getName(window.location.href).toLowerCase();
    qal.forEach(link => buttons.push(`<a target="_blank" href="${link.url.replace('%name%', name.toLowerCase())}">${link.name}</a>`));
    buttonsWrapper.innerHTML += buttons.join(' · ');
}