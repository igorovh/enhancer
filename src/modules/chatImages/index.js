import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import * as Settings from '$Settings';
import * as Island from '$Utils/island';
import { unstuckScroll } from '$Utils/chat';
import { getAutoCompleteHandler } from '$Utils/twitch';
import { parseURL } from './parsers';
import { tryURL } from '$Utils/url';
import { getImageData } from '$Utils/images';

const MAX_FILE_SIZE = 5000000;
const ALLOWED_HOSTS = [
    'media.giphy.com',
    'i.imgur.com',
    'c.tenor.com',
    'media.discordapp.net',
    'cdn.discordapp.com',
    'imagizer.imageshack.com',
    'imgur.com',
];

Peeker.registerListener('messageEvent', callback);

let enabled = Settings.get('chatImages');
Settings.registerUpdate('chatImages', (value) => (enabled = value));

let sevenTVInterval;
Peeker.registerListener('chatInitialize', () => {
    Logger.info('7TV Chat Images', !!document.querySelector('#seventv-root'));
    if (!!document.querySelector('#seventv-root')) {
        Logger.info('Initializing 7TV Chat Images');
        if (sevenTVInterval) clearInterval(sevenTVInterval);
        sevenTVInterval = setInterval(() => {
            const messages = [...document.querySelectorAll('.seventv-message')].filter(
                (message) => !message.hasAttribute('te-checked')
            );
            messages.forEach((message) => {
                message.setAttribute('te-checked', '');
                const content = message.querySelector('.seventv-chat-message-body');
                if (!content) return;
                if (!content.textContent.startsWith('https://')) return;
                const links = content.querySelectorAll('a');
                if (links.length < 1) return;
                const link = links[0];

                let url = tryURL(link.href);
                if (!url) return;
                url = parseURL(url);
                if (!checkConditions(url)) return;

                createImage(url, link);
            });
        }, 1000);
    }
});

let checkedURL;
setInterval(() => {
    if (!enabled) return;

    const inputValue = getAutoCompleteHandler()?.state.value;
    if (!inputValue) return;
    if (!inputValue.startsWith('https://')) return;

    const args = inputValue.split(' ');
    if (args.length < 1) return;
    let url = tryURL(args[0]);
    if (!url) return;

    url = parseURL(url);
    if (checkedURL === url.href) return;
    checkedURL = url.href;
    if (!checkConditions(url)) return;

    Island.addToQueue('This image will be displayed on chat.');
});

function callback(message, data) {
    if (!enabled) return;
    const content = data.props?.message?.message || data.props?.message?.messageBody;
    if (!content) return;
    if (!content.startsWith('https://')) return;
    const contentElement =
        message.querySelector('.message') ||
        message.querySelector('.seventv-message-context') ||
        message.querySelector('span[data-test-selector="chat-line-message-body"]');
    if (!contentElement) return;
    const links = contentElement.querySelectorAll('a');
    if (links.length > 1) return;
    const linkElement = links[0];

    let url = tryURL(linkElement.href);
    if (!url) return;
    url = parseURL(url);
    if (!checkConditions(url)) return;

    createImage(url, linkElement);
}

function createImage(url, element) {
    const imageElement = new Image();
    imageElement.classList = 'te-image-img';
    imageElement.src = url.href;
    Logger.debug(`Trying to render new chat image`, element.href);
    imageElement.onload = () => {
        element.classList.add('te-image-a');
        element.innerHTML = '';
        element.appendChild(imageElement);
        unstuckScroll();
    };
}

function isValidHost(url) {
    return ALLOWED_HOSTS.some((host) => url.host.endsWith(host));
}

function checkConditions(url, warn = true) {
    if (!isValidHost(url)) return false;
    if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url.pathname)) return false;

    if (url.host === 'i.imgur.com') {
        if (url.pathname.includes('/a/')) return false;
    }

    const imageData = getImageData(url.href);
    if (!imageData) return false;
    if (imageData.size > MAX_FILE_SIZE) {
        if (warn) Logger.warn(`Image is too large to render it.`, url.href);
        return false;
    }
    return true;
}
