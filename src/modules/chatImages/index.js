import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import * as Settings from '$Settings';
import * as Island from '$Utils/island';
import { unstuckScroll } from '$Utils/chat';
import { getAutoCompleteHandler } from '$Utils/twitch';
import { isFFZ } from '$Utils/extensions';

const MAX_FILE_SIZE = 5000000;

Peeker.registerListener('messageEvent', fix);

function fix(message, data) {
    if (isFFZ()) callback(message, data);
    else setTimeout(() => callback(message, data), 10);
}

let enabled = Settings.get('chatImages');

Settings.registerUpdate('chatImages', (value) => (enabled = value));

const allowedHosts = [
    'media.giphy.com',
    'i.imgur.com',
    'c.tenor.com',
    'media.discordapp.net',
    'cdn.discordapp.com',
    'imagizer.imageshack.com',
];

let checkedURL;
setInterval(() => {
    if (!enabled) return;
    const value = getAutoCompleteHandler()?.state.value;
    if (!value.startsWith('https://')) return;
    const words = value.split(' ');
    if (words.length < 1) return;

    const url = tryURL(words[0]);
    if (!url) return;
    if (checkedURL === url.href) return;
    checkedURL = url.href;
    if (!checkConditions(url)) return;
    Island.addToQueue('This image will be displayed on chat.');
}, 1000);

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

    const url = tryURL(linkElement.href);
    if (!url) return;
    if (!checkConditions(url)) return;

    const imageElement = new Image();
    imageElement.classList = 'te-image-img';
    imageElement.src = linkElement.href;
    Logger.debug(`Trying to render new chat image`, linkElement.href);
    imageElement.onload = () => {
        linkElement.classList.add('te-image-a');
        linkElement.innerHTML = '';
        linkElement.appendChild(imageElement);
        unstuckScroll();
    };
}

function checkHost(url) {
    return allowedHosts.some((host) => url.host.endsWith(host));
}

function getImageData(url) {
    try {
        const http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send(null);

        if (http.status === 200) {
            return {
                type: http.getResponseHeader('Content-Type'),
                size: http.getResponseHeader('Content-Length'),
            };
        }
    } catch (error) {
        Logger.warn('Cannot get image data', error);
    }
}

function tryURL(href) {
    try {
        return new URL(href);
    } catch (error) {
        return false;
    }
}

function checkConditions(url, warn = true) {
    if (!checkHost(url)) return false;
    if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url.pathname)) return false;
    const imageData = getImageData(url.href);
    if (!imageData) return false;
    if (imageData.size > MAX_FILE_SIZE) {
        if (warn) Logger.warn(`Image is too large to render it.`, url.href);
        return false;
    }
    return true;
}
