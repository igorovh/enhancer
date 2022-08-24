import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import { getChatMessagesById, getChatService, getChat } from '$Utils/twitch';
import { getUsername } from '$Utils/chat';
import { tooltip } from '$Utils/tooltip';
import { addOption } from '$Utils/messageMenu';
import Component from './component';

Peeker.registerListener('messageEvent', callback);

let lastBump = 0;

addOption({
    position: 0,
    text: 'Bump message',
    icon: 'fa-solid fa-thumbs-up',
    condition: (message, data) => {
        return (
            getUsername().toLowerCase() !== data.props?.message?.user?.userLogin &&
            !document.querySelector('.chat-input-tray__open') &&
            !document.querySelector('p[data-test-selector="current-user-timed-out-text"]')
        );
    },
    available: (message) => {
        if (lastBump >= Date.now()) return `You can bump message every 30 seconds.`;
        if (!message.hasAttribute('te-bumped')) return true;
        return `You've already bumped this message`;
    },
    callback: (message, data) => {
        if (lastBump >= Date.now()) return false;

        const messageId = data.props?.message?.id;
        const channel = getChat()?.props?.channelLogin;
        if (!channel || !messageId) return;

        Logger.debug(`Bumping message with id: ${messageId}`);

        getChatService().client.connection.ws.send(
            `@reply-parent-msg-id=${messageId} PRIVMSG #${getChat().props.channelLogin} :+1`
        );
        lastBump = Date.now() + 31000;

        message.setAttribute('te-bumped', true);
        refreshBumps(message, messageId, addBumps(message));

        return true;
    },
});

function callback(message, data) {
    if (!data.props.message) return;

    const content = data.props.message?.messageBody;
    if (content && content.trim() === '+1' && data.props.message.reply) {
        const replyId = data.props.message.reply.parentMsgId;
        const bumped = getChatMessagesById(replyId)[0];
        if (!bumped) return;
        if (data.props.message?._enhancer_bumps?.hide) {
            message.classList.add('te-bump-message');
            return;
        }
        if (data.props.message?._enhancer_bumps?.bumped) return;

        const bumpInfo = {
            bumpMessage: {
                id: replyId,
            },
            bumped: true,
        };
        bumpInfo.hide = true; //TODO Settings - Hide +1 messages
        data.props.message._enhancer_bumps = bumpInfo;

        message.classList.add('te-bump-message');

        const bumps = addBumps(bumped.element);
        refreshBumps(bumped.element, replyId, bumps);
    }
}

function addBumps(bumped, amount = 1) {
    let bumps = amount;
    if (bumped.hasAttribute('te-bumps')) bumps += parseInt(bumped.getAttribute('te-bumps'));
    bumped.setAttribute('te-bumps', bumps);
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
