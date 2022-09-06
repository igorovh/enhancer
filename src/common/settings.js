import * as Logger from '$Logger';
import { DEFAULT_SETTINGS } from '$Utils/constants';

let settings = DEFAULT_SETTINGS;

Logger.info('Loading settings...');
let savedSettings = localStorage.getItem('_enhancer_settings');
if (savedSettings) settings = JSON.parse(savedSettings);
else Logger.info('Settings are not saved - using defaults.');

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
    document.querySelector('#te-settings').style.display = 'flex';
}

export function hide() {
    document.querySelector('#te-settings').style.display = 'none';
}

const updates = [];

export function registerUpdate(id, callback) {
    updates.push({ id, callback });
}

function update(id, value) {
    updates.filter((update) => update.id === id).forEach((update) => update.callback(value));
}

// Debug
window.enhancerUpdate = update;
