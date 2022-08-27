import { addOption } from '$Utils/messageMenu';
import { setText } from '$Utils/chat';

addOption({
    text: 'Copy message to text area',
    icon: 'fa-solid fa-copy',
    condition: () => {
        return !document.querySelector('p[data-test-selector="current-user-timed-out-text"]');
    },
    available: () => {
        return true;
    },
    callback: (message, data) => {
        const content = data.props?.message?.message;
        if (!content) return true;
        setText(content, true);
        return true;
    },
});
