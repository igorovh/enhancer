import * as Peeker from '$Peeker';
import { getChatMessages, sendMessage } from '$Utils/twitch';
import Component from './component';

const element = Component();
document.body.appendChild(element);
hide();

const options = {
    enabled: false,
    username: '',
    content: '',
};

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    if (!options.enabled) return;
    const parsed = parse([{ element: message, component: data }]);
    if (parsed.length < 1) return;
    if (checkMessage(parsed[0], options.username, options.content)) parsed[0].element.classList.add('te-search-hide');
}

window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'F') {
        resetMessages();
        if (element.style.display === 'flex') {
            hide();
            return;
        }
        if (options.enabled) {
            sendMessage('You have left search mode.', false);
            options.enabled = false;
            return;
        }
        show();
        // serachMessages('vopp_bot', 'test');
    }
});

function serachMessages(username, content) {
    if (options.enabled) resetMessages();
    options.enabled = true;
    options.username = username;
    options.content = content;
    const messages = parse(getChatMessages());
    const toHide = [];
    for (const message of messages) {
        if (checkMessage(message, username, content)) toHide.push(message);
    }
    toHide.forEach((message) => message.element.classList.add('te-search-hide'));
    sendMessage('You have entered search mode, to exit press CTRL + SHIFT + F.', false);
}

function checkMessage(message, username = '', content = '') {
    const serachByUsername = username.length > 1 && username;
    const serachByContent = content.length > 1 && content;
    const foundUsername = message.author.toLowerCase().startsWith(username.toLowerCase());
    const foundContent = message.content.includes(content);

    if (serachByUsername && serachByContent) {
        if (foundUsername && foundContent) return false;
        return true;
    }

    if (serachByUsername && foundUsername) return false;
    if (serachByContent && foundContent) return false;
    return true;
}

function resetMessages() {
    document.querySelectorAll('.te-search-hide').forEach((message) => message.classList.remove('te-search-hide'));
}

function parse(messages) {
    const parsed = [];
    for (const message of messages) {
        const author = message.component?.props?.message?.user?.displayName;
        const content = message.component?.props?.message?.message;
        if (!author || !content) return;
        parsed.push({ element: message.element, author, content });
    }
    return parsed;
}

function show() {
    element.style.display = 'flex';
}

function hide() {
    element.style.display = 'none';
}
