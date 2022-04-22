import { Module } from '../module.js';
import { logger } from '../../utils/logger.js';
import { getChatMessage, getChatMessages } from '../../utils/twitch.js';

export const chatBumpingModule = new Module('chatMessages', callback);

function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    const callback = (mutationList, observer) => {
        for(const mutation of mutationList) {
            if(mutation.type === 'childList' && mutation.addedNodes) {
                for(const message of mutation.addedNodes) {
                    checkMessage(getChatMessage(message), message);
                }
            }
        }
    }
    const chatObserver = new MutationObserver(callback);
    chatObserver.observe(element, { attributes: true, childList: true });
    logger.info('Chat bumping observer started.');
}

function checkMessage(message, element) {
    if(!message) return;
    element.setAttribute('data-message-id', message.props?.message?.id);
    const messageContent = message.props?.message?.message;
    if(messageContent && messageContent === '^') {
        element.remove();
        const bumpElement = getMessageById(messageContent.split(' ')[1]);
    }
}

function getMessageById(id) {
    return document.querySelector(`div[data-message-id=${id}]`);
} 