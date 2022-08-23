import { addOption } from '$Utils/messageMenu';
import { addText } from '$Utils/chat';

addOption({
    position: 3,
    text: 'Copy username to text area',
    condition: () => {
        return !document.querySelector('p[data-test-selector="current-user-timed-out-text"]');
    },
    available: () => {
        return true;
    },
    callback: (message, data) => {
        const username = data.props?.message?.user?.displayName;
        if (!username) return true;
        addText(`@${username}, `, true);
        return true;
    },
});
