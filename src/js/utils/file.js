import { twitchEnhancer } from '../main.js';

export function getFile(path) {
    return twitchEnhancer.url.replace('%name%', path);
}