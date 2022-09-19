import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
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

let reminder;

Peeker.registerListener('messageEvent', callback);
Peeker.registerListener('chatInitialize', () => {
    Logger.debug('Reseting all serach settings, because new chat has been loaded.');
    resetMessages();
    changeTitle();
    if (reminder) clearInterval(reminder);
    options.enabled = false;
});

function callback(message, data) {
    if (!options.enabled) return;
    const parsed = parse([{ element: message, component: data }]);
    if (!parsed || parsed.length < 1) return;
    if (checkMessage(parsed[0], options.username, options.content)) parsed[0].element.classList.add('te-search-hide');
}

window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'F') {
        resetMessages();
        if (!document.querySelector('.stream-chat')) return;
        if (element.style.display === 'flex') {
            hide();
            return;
        }
        if (options.enabled) {
            changeTitle();
            if (reminder) clearInterval(reminder);
            sendMessage('You have left search mode.', false);
            options.enabled = false;
            return;
        }
        show();
        // serachMessages('vopp_bot', 'test');
    }
});

function serachMessages(username, content) {
    if (username.length < 1 && content.length < 1) return;
    if (options.enabled) resetMessages();
    changeTitle('YOU ARE IN SEARCH MODE');

    if (username) username = username.toLowerCase();
    if (content) content = content.toLowerCase();

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

    reminder = setInterval(() => {
        if (!options.enabled) return;
        sendMessage('You are still in serach mode, to exit press CTRL + SHIFT + F.', false);
    }, 30000);
}

function checkMessage(message, username = '', content = '') {
    const serachByUsername = username.length > 1 && username;
    const serachByContent = content.length > 1 && content;
    const foundUsername = message.author.toLowerCase().startsWith(username.toLowerCase());
    const foundContent = message.content.includes(content.toLowerCase());

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
        const author =
            message.component?.props?.message?.user?.displayName?.toLowerCase() ??
            message.component?.props?.message?.user?.userDisplayName?.toLowerCase();
        const content = message.component?.props?.message?.message ?? message.component?.props?.message?.messageBody;
        if (!author || !content) return;
        parsed.push({ element: message.element, author, content });
    }
    return parsed;
}

function show() {
    element.style.display = 'flex';
    const usernameInput = document.querySelector('#te-chat-search-username-input');
    const messageInput = document.querySelector('#te-chat-search-message-input');

    usernameInput.value = '';
    messageInput.value = '';

    usernameInput.focus();
}

function hide() {
    element.style.display = 'none';
}

function changeTitle(title = 'Stream Chat') {
    const header = document.querySelector('#chat-room-header-label');
    header.textContent = title;
}

// To fix later

window.__enhancer_search_menu = (type) => {
    if (type === 'username') serachMessages(document.querySelector('#te-chat-search-username-input').value, '');
    else if (type === 'message') serachMessages('', document.querySelector('#te-chat-search-message-input').value);
    hide();
};

window.__enhancer_serach_menu_enter = (event, element, type) => {
    if (element.value < 1) return;
    if (event.keyCode === 13) window.__enhancer_search_menu(type);
};
