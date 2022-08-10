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
        div.id = 'te-usercard-watchtime';
        const watchtime = await downloadWatchTime(username);
        if (!watchtime) {
            div.innerHTML += `
                <span>An error occurred, please try again later.</span>
                <span>You still can check them manually on these pages:</span>
                <span class="te-usercard-bold"><a target="_blank" href="https://vislaud.com/${username}" class="te-card-header">vislaud.com/${username}</a></span>
                <span class="te-usercard-bold"><a target="_blank" href="https://xayo.pl/${username}" class="te-card-header">xayo.pl/${username}</a><</span>
            `;
        } else {
            //
        }
        return div;
    },
];

export default async (username) => {
    const usercard = document.createElement('div');
    usercard.id = 'te-usercard';
    for (const callback of elements) usercard.appendChild(await callback(username));
    return usercard;
};

const services = {
    xayo: async (username) => {
        return;
        // TODO
        // let data = await fetch(`https://wcapi.vopp.top/user/xayo/${username}`);
        // if(data.status != 200) return;
        // data = await data.json();
        // if(data.length < 1) return;
        // data = data[0];
        // let totalTime = 0;
        // data.watchtimes.sort((a, b) => {
        //     return b.watchtime - a.watchtime;
        // });
        // data.watchtimes.forEach(streamer => totalTime += streamer.watchtime * 60);
        // const watchtimes = [];
        // for(let i = 0; i < 5; i++) {
        //     const watchtime = data.watchtimes[i];
        //     if(watchtime) watchtimes.push({
        //         position: i + 1,
        //         streamer: watchtime.streamer.displayName,
        //         time: watchtime.watchtime * 60
        //     });
        // }
        // return {
        //     service: 'xayo.pl/{name}',
        //     username,
        //     watchtimes,
        //     totalTime
        // }
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
        const xayo = services.xayo(username);
        const vislaud = services.vislaud(username);

        if (xayo && vislaud) {
            if (xayo.totalTime > vislaud.totalTime) return xayo;
            return vislaud;
        }
        if (!xayo) return vislaud;
        return xayo;
    },
};

async function downloadWatchTime(username) {
    return await services[settings.service];
}
