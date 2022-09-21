import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import * as Settings from '$Settings';
import { getChatMessagesById, getChatMessage, getChatService, getChat } from '$Utils/twitch';
import { getUsername } from '$Utils/chat';
import { sendMessage } from '$Utils/twitch';
import { tooltip } from '$Utils/tooltip';
import { addOption } from '$Utils/messageMenu';
import Component from './component';

let enabled = Settings.get('bumps.enabled');
let hideMessages = Settings.get('bumps.hideMessages');

Settings.registerUpdate('bumps.enabled', (value) => (enabled = value));
Settings.registerUpdate('bumps.hideMessages', (value) => (hideMessages = value));

Peeker.registerListener('messageEvent', callback);

let lastBump = 0;

addOption({
    position: 0,
    text: 'Bump message',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="te-message-menu-icon"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>`,
    condition: (message, data) => {
        return (
            enabled &&
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
        return bumpMessage(message, data, true);
    },
});

function bumpMessage(message, data) {
    if (lastBump >= Date.now()) {
        sendMessage(`You can't bump messages that fast, wait a moment.`, false);
        return false;
    }

    if (!localStorage.getItem('__enhancer_first_bump')) {
        sendMessage(
            'Hey! This is your first message bump. Bumping works by sending "+1" reply as you (your account), if you are not okay with this you can disable this in the options, which are located in the top right corner of the chat.'
        );
        localStorage.setItem('__enhancer_first_bump', true);
    }

    const messageId = data.props?.message?.id;
    const channel = getChat()?.props?.channelLogin;
    if (!channel || !messageId || message.hasAttribute('te-bumped')) return;

    Logger.debug(`Bumping message with id: ${messageId}`);

    getChatService().client.connection.ws.send(
        `@reply-parent-msg-id=${messageId} PRIVMSG #${getChat().props.channelLogin} :+1`
    );
    lastBump = Date.now() + 31000;

    message.setAttribute('te-bumped', true);
    refreshBumps(message, messageId, addBumps(message), true);

    return true;
}

function callback(message, data) {
    if (!enabled) return;
    if (!data.props.message) return;

    const content = data.props.message?.messageBody.replaceAll('\u{E0000}', '');
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

        if (hideMessages) {
            bumpInfo.hide = true;
            message.classList.add('te-bump-message');
        }
        data.props.message._enhancer_bumps = bumpInfo;

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

function refreshBumps(element, id, amount, alreadyBumped = false) {
    if (!amount) amount = parseInt(element.getAttribute('te-bumps'));
    let bumps = element.querySelector('.te-bumps');
    if (bumps) bumps.remove();
    const content =
        element.querySelector('.message') ||
        element.querySelector('.seventv-message-context') ||
        element.querySelector('span[data-test-selector="chat-line-message-body"]');
    if (!content) return;
    bumps = Component(id, amount);

    const chatMessage = getChatMessage(element);
    if (alreadyBumped || chatMessage.props.message?._enhancer_already_bumped) {
        chatMessage.props.message._enhancer_already_bumped = true;
        bumps.setAttribute('te-bumped', true);
    } else bumps.addEventListener('click', () => bumpMessage(element, chatMessage));

    content.appendChild(bumps);
    tooltip(bumps, `te-bump-${id}`);
}
