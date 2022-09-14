import * as Logger from '$Logger';
import { DEFAULT_SETTINGS } from '$Utils/constants';

let settings = DEFAULT_SETTINGS;

Logger.info('Loading settings...');

if (!localStorage.getItem('_enhancer_settings')) {
    Logger.info('Settings are not saved - using defaults.');
    localStorage.setItem('_enhancer_settings', JSON.stringify(DEFAULT_SETTINGS));
} else {
    Logger.info('Settings loaded.');
}

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
    const settings = document.querySelector('#te-settings');
    settings.setAttribute('open', '');
}

export function hide() {
    const settings = document.querySelector('#te-settings');
    settings.setAttribute('closing', '');
    settings.addEventListener(
        'animationend',
        () => {
            settings.removeAttribute('closing');
            settings.removeAttribute('open');
        },
        { once: true }
    );
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
