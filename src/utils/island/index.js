import { queue } from '$Modules/chatIsland';

export function addToQueue(text) {
    queue.push(text);
}
