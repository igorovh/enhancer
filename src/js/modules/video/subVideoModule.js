import { Module } from '../module.js';
import { getVideoId } from '../../utils/url.js';

export const videoModule = new Module('video', callback);

function callback(element) {
	if (!window.location.href.includes('/videos/')) return;
    const contentGate = element.querySelector('.content-overlay-gate__content');
    if(!contentGate) return;
    const videoId = getVideoId(window.location.href);
    const url = `https://subvod.ml/?id=${videoId}`;
    const text = document.createElement('a');
    text.href = url;
    text.textContent = 'Click here';
    contentGate.appendChild(text);
}