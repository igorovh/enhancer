// import { logger } from './';

const defaultSettings = {
    quickLinks: {
        links: [
            {
                name: 'TwitchTracker',
                url: 'https://twitchtracker.com/%name%'
            },
            {
                name: 'SullyGnome',
                url: 'https://sullygnome.com/channel/%name%'
            },
            {
                name: 'Emotes',
                url: 'https://emotes.vopp.top/?name=%name%'
            }
        ]
    }
};

let settings = defaultSettings;

let savedSettings = localStorage.getItem('_enhancer_settings');
if(savedSettings) settings = JSON.parse(savedSettings);
// else logger.info('Settings are not saved. Using defaults.');

export function get(id) {
    return settings[id] || defaultSettings[id];
}

export function save() {
    localStorage.setItem(settings);
}

export function change(id, value) {
    settings[id] = value;
    update(id, value);
}

export function show() {
    document.body.classList.add('te-settings-enabled');
}

export function hide() {
    document.body.classList.remove('te-settings-enabled');
}

const updates = [];

export function registerUpdate(id, callback) {
    updates.push({ id, callback });
}

function update(id, value) {
    updates
        .filter(update => update.id === id)
        .forEach(update => update.callback(value));
}