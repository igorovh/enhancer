import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import * as Settings from '$Settings';
import { getChatMessages } from '$Utils/twitch';

Peeker.registerListener('messageEvent', callback);

let settings = Settings.get('highlightMentions');

Settings.registerUpdate('highlightMentions', (value) => (settings = value));

function callback(message) {
    setTimeout(() => {
        const mentions = [
            ...message.querySelectorAll('.chat-line__message-mention'),
            ...message.querySelectorAll('.mention-fragment'),
            ...message.querySelectorAll('.seventv-mention'),
        ];
        if (mentions.length < 1) return;
        for (const mention of mentions) {
            const username = mention.textContent.replace('@', '').toLowerCase();
            mention.setAttribute('mention-user', username);
            mention.addEventListener('mouseover', hoverMention);
            mention.addEventListener('mouseout', unHoverMention);
        }
    }, 25); //Thanks 7TV :)
}

function hoverMention(event) {
    if (!settings) return;
    const username = event.target.getAttribute('mention-user');
    Logger.debug(`Hovering "${username}" messages (mention-hover).`);
    const messages = getChatMessages();
    messages
        .filter(
            (message) =>
                message?.component?.props?.message?.user.displayName?.toLowerCase() === username ||
                message?.component?.props?.message?.user.userDisplayName?.toLowerCase() === username
        )
        .forEach((message) => message.element.classList.add('te-mention-messages'));
}

function unHoverMention() {
    Logger.debug('Unhovering messages (mention-hover).');
    document
        .querySelectorAll('.te-mention-messages')
        .forEach((message) => message.classList.remove('te-mention-messages'));
}
