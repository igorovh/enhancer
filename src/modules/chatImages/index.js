import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import * as Settings from '$Settings';
import { unstuckScroll } from '$Utils/chat';

Peeker.registerListener('messageEvent', callback);

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
    if (!checkHost(url)) return;
    if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url.pathname)) return;

    const imageData = getImageData(url.href);
    if (!imageData) return;
    const maxFileSize = 5000000;
    const sizeInMB = (imageData.size / 1000000).toFixed(2);
    if (imageData.size > maxFileSize) {
        Logger.warn(`Image is too large to render it (${sizeInMB}mb) ->`, linkElement.href);
        return;
    }

    const imageElement = new Image();
    imageElement.classList = 'te-image-img';
    imageElement.src = linkElement.href;
    Logger.debug(`Trying to render new chat image (${sizeInMB}mb) ->`, linkElement.href);
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
