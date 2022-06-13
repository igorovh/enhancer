import { Listener } from '../listener.js';

export const chatLayoutListener = new Listener('chatLayout', finder, true, 1500);

function finder(document) {
    const chat = document.querySelector('.stream-chat');
    if(!chat || chat.hasAttribute('twitch-enhancer')) return;
    return chat;
} 