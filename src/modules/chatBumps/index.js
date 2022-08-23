import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import { getChatMessagesById } from '$Utils/twitch';
import { getUsername } from '$Utils/chat';
import { tooltip } from '$Utils/tooltip';
import { addOption } from '$Utils/messageMenu';
import Component from './component';
import NodeCache from 'node-cache';

Peeker.registerListener('messageEvent', callback);

addOption({
    position: 0,
    text: 'Bump message',
    condition: (message, data) => {
        return (
            getUsername().toLowerCase() !== data.props?.message?.user?.userLogin &&
            !document.querySelector('.chat-input-tray__open') &&
            !document.querySelector('p[data-test-selector="current-user-timed-out-text"]')
        );
    },
    available: (message) => {
        if (!message.hasAttribute('te-bumped')) return true;
        return `You've already bumped this message.`;
    },
    callback: () => {
        //TODO Send bump
        return true;
    },
});

const cache = new NodeCache({ stdTTL: 60, maxKeys: 150, checkperiod: 60 });

function callback(message, data) {
    const messageId = data.props.message?.id;
    const content = data.props.message?.messageBody;
    console.log('[te]', messageId, data.props.message?.id, data.props.message.id, data.props.message);
    setTimeout(
        () => console.log('[te]', messageId, data.props.message?.id, data.props.message.id, data.props.message),
        1000
    );
    if (content && content.trim() === '+1' && data.props.message.reply) {
        const replyId = data.props.message.reply.parentMsgId;
        const bumped = getChatMessagesById(replyId)[0];
        if (!bumped) return;
        Logger.debug(`New message with id: ${messageId}`);
        if (cache.get(messageId)) {
            Logger.debug(`Message again: ${messageId}`);
            // message.classList.add('te-bumped');
            return;
        }
        cache.set(messageId, 0, 60);
        Logger.debug(`Adding to cache: ${messageId}`);
        // message.classList.add('te-bumped'); //TODO Settings - Hide +1 messages
        //TODO When replying to the same message twice it shows up, idk why
        const bumps = addBumps(bumped);
        refreshBumps(bumped.element, replyId, bumps);
    }
}

function addBumps(bumped, amount = 1) {
    const element = bumped.element;
    let bumps = amount;
    if (element.hasAttribute('te-bumps')) bumps += parseInt(element.getAttribute('te-bumps'));
    element.setAttribute('te-bumps', bumps);
    return bumps;
}

function refreshBumps(element, id, amount) {
    if (!amount) amount = parseInt(element.getAttribute('te-bumps'));
    let bumps = element.querySelector('.te-bumps');
    if (bumps) bumps.remove();
    const content =
        element.querySelector('.message') ||
        element.querySelector('.seventv-message-context') ||
        element.querySelector('span[data-test-selector="chat-line-message-body"]');
    if (!content) return;
    bumps = Component(id, amount);
    content.appendChild(bumps);
    tooltip(bumps, `te-bump-${id}`);
}
