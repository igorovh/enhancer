import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import { getChatMessagesById } from '$Utils/twitch';
import { getUsername } from '$Utils/chat';
import { tooltip } from '$Utils/tooltip';
import { addOption } from '$Utils/messageMenu';
import Component from './component';

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

function callback(message, data) {
    const content = data.props.message?.message;
    if (content && content.trim() === '+1' && data.props.message.reply) {
        const replyId = data.props.message.reply.parentMsgId;
        const bumped = getChatMessagesById(replyId)[0]?.element;
        if (!bumped) return;
        if (bumped.hasAttribute('te-bumped')) return;
        Logger.debug(`Bumping ${replyId} message`);
        bumped.setAttribute('te-bumped', true);
        message.classList.add('te-bumped'); //TODO Settings - Hide +1 messages
        //TODO When replying to the same message twice it shows up, idk why
        const bumps = addBumps(bumped);
        refreshBumps(bumped, replyId, bumps);
    }
}

function addBumps(element, amount = 1) {
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
