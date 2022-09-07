import * as Settings from '$Settings';
import * as Logger from '$Logger';
import { formatTime } from '$Utils/time';

const settings = Settings.get('usercard');

const formatter = {
    hour: (seconds) => {
        return `${(seconds / 60 / 60).toFixed(2)} hours`;
    },
    full: (seconds) => formatTime(seconds),
};

export const elements = [
    async (username) => {
        const div = document.createElement('div');
        div.className = 'te-usercard';
        const watchtime = await downloadWatchTime(username);
        if (!watchtime) {
            div.innerHTML += `
                <span>An error occurred, please try again later.</span>
                <span>You still can check them manually on these pages:</span>
                <a class="te-usercard-bold" target="_blank" href="https://vislaud.com/${username}">vislaud.com/${username}</a>
                <a class="te-usercard-bold" target="_blank" href="https://xayo.pl/${username}">xayo.pl/${username}</a>
                <a class="te-usercard-bold" target="_blank" href="https://twitchlogger.pl/tracker/${username}">twitchlogger.pl/tracker/${username}</a>
            `;
        } else {
            const url = watchtime.service.replace('{name}', username);
            div.innerHTML += `
                <a class="te-usercard-bold" href="https://${url}">${url}</a>
            `;
            for (const streamer of watchtime.watchtimes) {
                div.innerHTML += `
                    <span>
                        <span class="te-usercard-bold">${streamer.position}.</span>
                        <a href="https://twitch.tv/${streamer.streamer.toLowerCase()}">${streamer.streamer}</a>:
                        <span">${formatter[settings.format](streamer.time)}</span>
                    </span>
                `;
            }
            div.innerHTML += `
            <span">~ ${formatter[settings.format](watchtime.totalTime)}</span>
            `;
        }
        return div;
    },
];

export default async (username) => {
    const usercard = document.createElement('div');
    for (const callback of elements) usercard.appendChild(await callback(username));
    return usercard;
};

const services = {
    twitchlogger: async (username) => {
        const data = await fetch(`https://twitchlogger.pl/Tracker/SerachUser/${username}`);
        if (data.status != 200) return;
        const json = await data.json();
        if (json.userChannels < 1) return;

        json.userChannels.sort((a, b) => {
            return b.count - a.count;
        });

        const watchtimes = [];
        let totalTime = 0;
        json.userChannels.forEach((channel) => (totalTime += channel.count * 5 * 60));
        for (let i = 0; i < 5; i++) {
            const channel = json.userChannels[i];
            if (channel)
                watchtimes.push({
                    position: i + 1,
                    streamer:
                        json.channels.filter((broadcaster) => broadcaster.broadcasterId === channel.broadcasterId)[0]
                            ?.broadcasterName || 'unknown',
                    time: channel.count * 5 * 60,
                });
        }

        return {
            service: 'twitchlogger.pl/tracker/{name}',
            username,
            watchtimes,
            totalTime,
        };
    },
    xayo: async (username) => {
        let data = await fetch(`https://wcapi.vopp.top/user/xayo/${username}`);
        if (data.status != 200) return;
        data = await data.json();
        if (data.length < 1) return;
        let totalTime = 0;
        data.forEach((streamer) => (totalTime += streamer.count * 5 * 60));
        const watchtimes = [];
        for (let i = 0; i < 5; i++) {
            const watchtime = data[i];
            if (watchtime)
                watchtimes.push({
                    position: i + 1,
                    streamer: watchtime.streamer,
                    time: watchtime.count * 5 * 60,
                });
        }
        return {
            service: 'xayo.pl/{name}',
            username,
            watchtimes,
            totalTime,
        };
    },
    auto: async (username) => {
        const watchtimes = [];

        const allServices = Object.keys(services).filter((service) => service !== 'auto');

        for (const service of allServices) {
            try {
                Logger.debug(`Trying to download watchtime data from ${service}.`);
                watchtimes.push(await services[service](username));
            } catch (error) {
                Logger.error(`Cannot download data from ${service}. Error: `, error);
            }
        }

        watchtimes.sort((a, b) => {
            return b.totalTime - a.totalTime;
        });

        return watchtimes[0];
    },
};

async function downloadWatchTime(username) {
    return await services[settings.service](username);
}
