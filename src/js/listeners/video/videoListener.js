import { Listener } from '../listener.js';

export const videoListener = new Listener('video', finder, true, 1000);

function finder(document) {
    const video = document.querySelector('.persistent-player');
    if(!video || video.hasAttribute('twitch-enhancer')) return;
    return video;
} 
