import { Module } from '../module.js';
import { addText } from '../../utils/chatInput.js';

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
}

function prepareEmotes(emotes) {
    if(emotes.length < 1) return;
    emotes.forEach(emote => {
        emote.addEventListener('mouseup', event => {
            if(typeof event !== 'object') return;
            if(event.button !== 1) return;
            const name = emote.alt;
            console.log('[te]', emote);
            addText(name, true);
        });
    });
}