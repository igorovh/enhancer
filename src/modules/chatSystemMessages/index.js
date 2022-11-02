import * as Peeker from '$Peeker';

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    const username =
        data?.props?.message?.user.displayName?.toLowerCase() ||
        data?.props?.message?.user.userDisplayName?.toLowerCase();
    if (!username) return;
    if (username !== 'twitch_enhancer') return;
    message.classList.add('te-system-message');
}
