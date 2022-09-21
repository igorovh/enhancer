import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import Component from './component';
import GQL from '$Utils/twitchql';
import { getLive } from '$Utils/twitch';
import { numberWithCommas } from '$Utils/number';
// import { tooltip } from '$Utils/tooltip';

Peeker.add(() => {
    if (window.location.href.includes('clips.twitch.tv')) return;
    const viewersCount = document.querySelector('p[data-a-target="animated-channel-viewers-count"]')?.parentElement;
    if (!viewersCount || !Peeker.canCreate('chattersCount', viewersCount)) return;
    return viewersCount;
}, callback);

Peeker.add(() => {
    if (window.location.href.includes('clips.twitch.tv')) return;
    const theatreViewersCount = document.querySelector(
        'p[data-test-selector="stream-info-card-component__description"]'
    );
    if (!theatreViewersCount || !Peeker.canCreate('chattersCount', theatreViewersCount)) return;
    return theatreViewersCount;
}, callback);

let counters = [];
let updater;

async function callback(parent) {
    const counter = Component();
    counters.push(counter);
    counter.addEventListener('click', updateChatters);
    // tooltip(chatters, 'te-chatters-count'); // TODO FIX TOOLTIP
    parent.appendChild(counter);
    updateChatters();
    startUpdater();
}

async function updateChatters() {
    const channel = getLive()?.props?.content?.channelLogin;
    if (!channel) return;
    const data = await getChatters(channel);
    Logger.debug(`Updating chatters count on ${channel} channel to: ${data} at`, new Date());
    setChatters(data);
}

function setChatters(amount) {
    counters.forEach((counter) => (counter.textContent = `[${amount}]`));
}

async function getChatters(channel) {
    const query = `
    query GetChannelChattersCount($name: String!) {
        channel(name: $name) {
            chatters {
                count
            }
        }
    }`;
    const data = await GQL.query(query, { name: channel }, false);
    return numberWithCommas(data?.data?.channel?.chatters?.count) || '???';
}

function startUpdater() {
    if (updater) clearInterval(updater);
    updater = setInterval(() => updateChatters(), 60000);
}
