chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.action === 'checkUser') {
        console.log(`Checking user ${msg.name} by ${msg.service}...`);
        if(msg.service === 'auto') {
            getAuto(msg.name).then(sendResponse);
        } else if(msg.service === 'xayo') {
            getXayo(msg.name).then(sendResponse);
        } else if(msg.service === 'vislaud') {
            getVislaud(msg.name).then(sendResponse);
        }
        return true;
    } else if(msg.action === 'settings') {
        chrome.tabs.create({
            url: "./pages/options.html"
        });
    }
});

async function getAuto(name) {
    const xayo = await getXayo(name);
    const vislaud = await getVislaud(name);
    if(!xayo.error && !vislaud.error) {
        if(xayo.time > vislaud.time) return xayo;
        else return vislaud;
    }
    if(xayo.error) return vislaud;
    else return xayo;
}

async function getXayo(name) {
    let json = await fetch(`https://xayo.pl/api/watchtime/${name}`);
    json = await json.json();
    if(json.length < 1) return { error: 404 };
    let allTime = 0;
    json.forEach(streamer => allTime += streamer.count * 5 * 60);
    const watchtime = {
        url: `xayo.pl/${name}`,
        time: allTime,
        watchtimes: []
    }
    for(let i = 0; i < 5; i++) {
        if(json[i]) {
            watchtime.watchtimes.push({
                position: i + 1,
                streamer: json[i].streamer,
                time: json[i].count * 5 * 60
            });
        }
    }
    return watchtime;
}

async function getVislaud(name) {
    let json = await fetch(`https://vislaud.com/api/chatters?logins=${name}`);
    json = await json.json();
    if(json.length < 1) return { error: 404 };
    json = json[0];
    let allTime = 0;
    json.watchtimes.sort((a, b) => {
        return b.watchtime - a.watchtime;
    });
    json.watchtimes.forEach(streamer => allTime += streamer.watchtime * 60);
    const watchtime = {
        url: `vislaud.com/${name}`,
        time: allTime,
        watchtimes: []
    }
    for(let i = 0; i < 5; i++) {
        if(json.watchtimes[i]) {
            watchtime.watchtimes.push({
                position: i + 1,
                streamer: json.watchtimes[i].streamer.displayName,
                time: json.watchtimes[i].watchtime * 60
            });
        }
    }
    return watchtime;
}