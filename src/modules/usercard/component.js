import * as Settings from '$Settings';
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
    twitchtracker: async (username) => {
        const data = await fetch(`https://twitchlogger.pl/Tracker/SerachUser/${username}`);
        if (data.status != 200) return;
        const json = await data.json();
        if (json.userChannels < 1) return;

        json.userChannels.sort((a, b) => {
            return b.watchtime - a.watchtime;
        });

        const watchtimes = [];
        let totalTime = 0;
        json.userChannels.forEach((channel) => (totalTime += channel.count * 5 * 60));
        for (let i = 0; i < 5; i++) {
            const channel = json.userChannels[i];
            if (channel)
                channel.push({
                    position: i + 1,
                    streamer:
                        json.channels.filter((broadcaster) => broadcaster.broadcasterId === channel.broadcasterId)[0]
                            ?.broadcasterName || 'unknown',
                    time: channel.count * 5 * 60,
                });
        }

        return {
            service: 'https://twitchlogger.pl/tracker/{name}',
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
    vislaud: async (username) => {
        let data = await fetch(`https://vislaud.com/api/chatters?logins=${username}`);
        if (data.status != 200) return;
        data = await data.json();
        if (data.length < 1) return;
        data = data[0];
        let totalTime = 0;
        data.watchtimes.sort((a, b) => {
            return b.watchtime - a.watchtime;
        });
        data.watchtimes.forEach((streamer) => (totalTime += streamer.watchtime * 60));
        const watchtimes = [];
        for (let i = 0; i < 5; i++) {
            const watchtime = data.watchtimes[i];
            if (watchtime)
                watchtimes.push({
                    position: i + 1,
                    streamer: watchtime.streamer.displayName,
                    time: watchtime.watchtime * 60,
                });
        }
        return {
            service: 'vislaud.com/{name}',
            username,
            watchtimes,
            totalTime,
        };
    },
    auto: async (username) => {
        const xayo = await services.xayo(username);
        const vislaud = await services.vislaud(username);

        if (xayo && vislaud) {
            if (xayo.totalTime > vislaud.totalTime) return xayo;
            return vislaud;
        }
        if (!xayo) return vislaud;
        return xayo;
    },
};

async function downloadWatchTime(username) {
    return await services[settings.service](username);
}
