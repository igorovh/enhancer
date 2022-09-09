import { getPlayer, getChannelInfo } from '$Utils/twitch';
import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import * as Settings from '$Settings';
import { formatTime } from '$Utils/time';

let settings = Settings.get('watchtime');

Settings.registerUpdate('watchtime', (value) => (settings = value));

let updated = false;

setInterval(() => {
    if (!updated) requestUpdate();
    const player = getPlayer();
    const panel = getChannelInfo();
    if (!settings) return;
    if (!player || !panel) return;
    if (window.location.href.endsWith('twitch.tv/')) return; // Main page
    Logger.debug('Panel data', panel);
    if (!panel.props.isLive) return;
    const paused = player.props.mediaPlayerInstance.core.paused;
    if (paused) return;
    document.dispatchEvent(
        new CustomEvent('enhancer-watchtime', {
            detail: { type: 'watchtime', id: 'watch', data: { channel: player.props.content.channelLogin } },
        })
    );
}, 1000);

Peeker.add(() => {
    const panel = document.querySelector('.about-section__panel--content');
    if (!panel || !Peeker.canCreate('watchtime', panel)) return;
    return panel.children[0].children[0].children[0] || panel;
}, callback);

let watchtimeElement;

function callback(panel) {
    watchtimeElement = document.createElement('div');
    watchtimeElement.innerHTML = '<span class="te-watchtime-gray">Loading watchtime...</span>';
    panel.appendChild(watchtimeElement);
    requestUpdate();
}

function requestUpdate() {
    const channel = getChannelInfo()?.props.channelLogin;
    if (!channel) return;
    document.dispatchEvent(
        new CustomEvent('enhancer-watchtime', { detail: { type: 'watchtime', id: 'get', data: { channel } } })
    );
    Logger.debug(`Trying to request watchtime data for ${channel}.`);
}

document.addEventListener('enhancer-watchtime-response', (event) => {
    updated = true;
    watchtimeElement.innerHTML = createText(event.detail?.time, event.detail?.firstUpdate);
});

function createText(seconds, date) {
    if (!seconds || !date) return `<span class="te-watchtime-gray">Currently there is no watchtime data.</span>`;
    let formattedTime = formatTime(seconds);
    if (formattedTime.length < 1) formattedTime = '> 1 min';
    return `
        <span class="te-watchtime-bold">${formattedTime}</span> 
        <span class="te-watchtime-gray">watchtime since</span> 
        <span class="te-watchtime-bold">${new Date(date).toLocaleDateString()}</span> 
    `;
}
