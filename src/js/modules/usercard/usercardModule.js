import { Module } from '../module.js';

export const usercardModule = new Module('usercard', callback);

function callback() {
    console.log('[te] callback done!');
}