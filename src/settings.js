import { logger } from './';
import * as Peeker from '$Peeker';

const defaultSettings = {

};

let settings = defaultSettings;

let savedSettings = localStorage.getItem('_enhancer_settings');
if(savedSettings) settings = JSON.parse(savedSettings);
else logger.info('Settings are not saved. Using defaults.');

export function save() {
    localStorage.setItem(settings);
}

export function change(id, value) {
    settings[id] = value;
    Peeker.update(id);
}