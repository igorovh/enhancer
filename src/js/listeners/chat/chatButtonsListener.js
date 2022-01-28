import { Listener } from '../listener.js';

export const chatButtonsListener = new Listener('chatButtons', finder, true, 1500);

function finder(document) {
    const chatButtons = document.querySelector('.chat-input__buttons-container');
    if(!chatButtons || chatButtons.hasAttribute('twitch-enhancer')) return;
    return chatButtons;
} 