import { Listener } from '../listener.js';

export const usercardListener = new Listener('usercard', finder, false, 1000);

function finder(document) {
    console.log('[te]', 'looking', document);
    return true;
} 