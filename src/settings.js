// import { logger } from './';
import { DEFAULT_SETTINGS } from '$Utils/constants';

let settings = DEFAULT_SETTINGS;

let savedSettings = localStorage.getItem('_enhancer_settings');
if(savedSettings) settings = JSON.parse(savedSettings);
// else logger.info('Settings are not saved. Using defaults.');

export function get(id) {
    return settings[id] || DEFAULT_SETTINGS[id];
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

// Debug
window.enhancerUpdate = update;