import { extensionUrl } from '../main.js';

export function getFile(path) {
    return extensionUrl.replace('%name%', path);
}