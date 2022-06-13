import { Module } from '../module.js';
import { twitchEnhancer } from '../../main.js'; 
import { logger } from '../../utils/logger.js';

export const chatLayoutModule = new Module('chatLayout', callback);

const layoutOptions = [
    {
        option: 'te_hide_chat_events',
        call: chat => {
            const eventsContainer = chat.querySelector('.last-x-events_container');
            if(eventsContainer) {
                eventsContainer.remove();
                logger.info('Removing chat events panel...');
            }
        }
    }
]

function callback(chat) {
    chat.setAttribute('twitch-enhancer', '');

    layoutOptions.forEach(layoutOption => {
        if(twitchEnhancer.settings[layoutOption.option]) layoutOption.call(chat);
    });
}