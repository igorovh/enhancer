import * as Peeker from '$Peeker';
import * as Island from '$Utils/island';

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    const username =
        data?.props?.message?.user.displayName?.toLowerCase() ||
        data?.props?.message?.user.userDisplayName?.toLowerCase();
    if (!username) return;
    if (username !== 'twitch_enhancer') return;
    message.classList.add('te-system-message');
    const content = data.props?.message?.message || data.props?.message?.messageBody;
    if (!content) return;
    if (content.startsWith('%e:')) return;
    Island.addToQueue(content);
}
