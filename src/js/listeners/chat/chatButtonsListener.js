import { Listener } from '../listener.js';

export const chatButtonListener = new Listener('chatButton', finder, true, 1500);

function finder(document) {
    const chatButtons = document.querySelector('.stream-chat-header');
    if(!chatButtons || chatButtons.hasAttribute('twitch-enhancer')) return;
    return chatButtons;
} 