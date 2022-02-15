import { Module } from '../module.js';
import { addText } from '../../utils/chatInput.js';
import { logger } from '../../utils/logger.js';

export const chatEmotesModule = new Module('chatMessages', callback);

function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    const callback = (mutationList, observer) => {
        for(const mutation of mutationList) {
            if(mutation.type === 'childList' && mutation.addedNodes) {
                for(const message of mutation.addedNodes) {
                    prepareEmotes(message.querySelectorAll('.chat-line__message--emote'));
                }
            }
        }
    }
    const chatObserver = new MutationObserver(callback);
    chatObserver.observe(element, { attributes: true, childList: true });
    logger.info('Chat emotes observer started.');
}

function prepareEmotes(emotes) {
    if(emotes.length < 1) return;
    emotes.forEach(emote => {
        emote.addEventListener('contextmenu', event => {
            logger.log('test');
            const name = emote.alt;
            addText(`${name} `, true, true);
            event.preventDefault();
        });
    });
}