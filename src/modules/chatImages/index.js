import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import * as Settings from '$Settings';

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
    const imageElement = new Image();

    imageElement.classList = 'te-image-img';
    imageElement.src = linkElement.href;
    Logger.debug('Trying to render new chat image ->', linkElement.href);
    imageElement.onload = () => {
        linkElement.classList.add('te-image-a');
        linkElement.innerHTML = '';
        linkElement.appendChild(imageElement);
    };
}

function checkHost(url) {
    return allowedHosts.some((host) => url.host.endsWith(host));
}

function tryURL(href) {
    try {
        return new URL(href);
    } catch (error) {
        return false;
    }
}
