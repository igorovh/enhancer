import { Listener } from '../listener.js';

export const usercardListener = new Listener('usercard', finder, false, 1000);

function finder(document) {
    const usercard = document.querySelector('.viewer-card');
    if(!usercard || usercard.hasAttribute('twitch-enhancer')) return;
    return usercard;
} 
