import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import { getChatMessages } from '$Utils/twitch';

Peeker.registerListener('messageEvent', callback);

function callback(message) {
    const mentions = message.querySelectorAll('.chat-line__message-mention');
    if (mentions.length < 1) return;
    for (const mention of mentions) {
        const username = mention.textContent.replace('@', '').toLowerCase();
        mention.setAttribute('mention-user', username);
        mention.addEventListener('mouseover', hoverMention);
        mention.addEventListener('mouseout', unHoverMention);
    }
}

function hoverMention(event) {
    const username = event.target.getAttribute('mention-user');
    Logger.debug(`Hovering "${username}" messages (mention-hover).`);
    const messages = getChatMessages();
    messages.filter(message => message?.component?.props?.message?.user.displayName?.toLowerCase() === username)
    .forEach(message => message.element.classList.add('te-mention-messages'));
}

function unHoverMention() {
    Logger.debug('Unhovering messages (mention-hover).');
    document
        .querySelectorAll('.te-mention-messages')
        .forEach((message) => message.classList.remove('te-mention-messages'));
}
