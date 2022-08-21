import { getPlayer, getChannelInfo } from '$Utils/twitch';
import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import { formatTime } from '$Utils/time';

setInterval(() => {
    const player = getPlayer();
    if (!player) return;
    if (window.location.href.endsWith('twitch.tv/')) return; // Main page
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

    const channel = getChannelInfo().props.channelLogin;
    document.dispatchEvent(
        new CustomEvent('enhancer-watchtime', { detail: { type: 'watchtime', id: 'get', data: { channel } } })
    );
    Logger.debug('Requesting watchtime data for', channel);
}

document.addEventListener('enhancer-watchtime-response', (event) => {
    watchtimeElement.innerHTML = createText(event.detail.time, event.detail.firstUpdate);
});

function createText(seconds, date) {
    let formattedTime = formatTime(seconds);
    if (formattedTime.length < 1) formattedTime = '> 1 min';
    return `
        <span class="te-watchtime-bold">${formattedTime}</span> 
        <span class="te-watchtime-gray">watchtime since</span> 
        <span class="te-watchtime-bold">${new Date(date).toLocaleDateString()}</span> 
    `;
}
