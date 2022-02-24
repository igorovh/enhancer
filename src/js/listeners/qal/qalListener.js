import { Listener } from '../listener.js';

export const qalListener = new Listener('qal', finder, true, 1000);

function finder(document) {
    const channelInfo = document.querySelector('.about-section__panel')?.querySelector('.knjGHc');
    if(!channelInfo || channelInfo.hasAttribute('twitch-enhancer')) return;
    return channelInfo;
} 