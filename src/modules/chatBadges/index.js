import * as Peeker from '$Peeker';
import { addBadge, findBadges } from '$Utils/badge';

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    const username = data?.props?.message?.user.displayName?.toLowerCase();
    if(!username) return;
    const badges = findBadges(username);
    badges.forEach(badge => addBadge(badge, message));
}