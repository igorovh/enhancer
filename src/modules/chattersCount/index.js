import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import Component from './component';
import GQL from '$Utils/twitchql';
import { getLive } from '$Utils/twitch';
import { numberWithCommas } from '$Utils/number';
// import { tooltip } from '$Utils/tooltip';

Peeker.add(() => {
    const viewersCount = document.querySelector('p[data-a-target="animated-channel-viewers-count"]')?.parentElement;
    if (!viewersCount || !Peeker.canCreate('chattersCount', viewersCount)) return;
    return viewersCount;
}, callback);

let counter;
let updater;

async function callback(viewersCount) {
    counter = Component();
    counter.addEventListener('click', updateChatters);
    // tooltip(chatters, 'te-chatters-count'); // TODO FIX TOOLTIP
    viewersCount.appendChild(counter);
    updateChatters();
    startUpdater();
}

async function updateChatters() {
    const channel = getLive().props?.content?.channelLogin;
    if (!channel) return;
    const data = await getChatters(channel);
    Logger.debug(`Updating chatters count on ${channel} channel to: ${data}.`);
    setChatters(data);
}

function setChatters(amount) {
    counter.textContent = `[${amount}]`;
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
