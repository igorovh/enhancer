import { Listener } from '../listener.js';

export const chatMessagesListener = new Listener('chatMessages', finder, true, 1500);

function finder(document) {
    const chat = document.querySelector('.chat-scrollable-area__message-container');
    if(!chat || chat.hasAttribute('twitch-enhancer')) return;
    return chat;
} 