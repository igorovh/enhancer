import * as Logger from '$Logger';
import { DEFAULT_SETTINGS } from '$Utils/constants';

export let settings = DEFAULT_SETTINGS;

Logger.info('Loading settings...');

let savedSettings = localStorage.getItem('_enhancer_settings');
if (savedSettings) {
    settings = JSON.parse(savedSettings);
    Logger.info('Settings loaded!');
} else Logger.info('Settings are not saved - using defaults.');

export function set(id, value) {
    settings[id] = value;
    update(id, value);
    save();
}

export function get(id) {
    return settings[id] ?? DEFAULT_SETTINGS[id];
}

export function getMultiple(...ids) {
    const multiple = {};
    ids.forEach((id) => (multiple[id] = get(id)));
    return multiple;
}

export function save() {
    Logger.info('Saving settings...');
    localStorage.setItem('_enhancer_settings', JSON.stringify(settings));
}

const updates = [];

export function registerUpdate(id, callback) {
    updates.push({ id, callback });
}

function update(id, value) {
    updates.filter((update) => update.id === id).forEach((update) => update.callback(value));
    Logger.debug(`Settings updated: [${id}] ->`, value);
}

// CSS

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
