import { Listener } from '../../listener';

export const usercardListener = new Listener(finder, true, 1000);

function finder(document) {
    console.log('[te]', 'looking', document);
    return false;
} 