import { Listener } from '../listener.js';

export const clipListener = new Listener('clip', finder, true, 1000);

function finder(document) {
    const video = document.querySelector('.video-player__overlay');
    if(!video || video.hasAttribute('twitch-enhancer')) return;
    return video;
}