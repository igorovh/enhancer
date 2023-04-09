import { getChatInput, getAutoCompleteHandler, getChat, getScrollableChat } from './twitch';

export function setText(text, focus) {
    const chatInput = getChatInput();
    chatInput.props.onChange({ target: { value: text } });
    if (focus) chatInput.focus();
}

export function addText(text, focus) {
    return setText(format(text, getAutoCompleteHandler().state.value), focus);
}

function format(text, value) {
    if (!value.endsWith(' ') && value.length > 0) text = ' ' + text;
    return value + text;
}

export function getUsername() {
    return getChat()?.props?.currentUserDisplayName?.toLowerCase();
}

export function unstuckScroll7TV() {
    const scrollableChat = document.querySelector('.scrollable-contents');
    if (!scrollableChat) return;
    if (scrollableChat.querySelector('.seventv-message-buffer-notice')?.textContent === 'Chat Paused') return;
    scrollableChat.scrollToBottom();
}

export function unstuckScroll() {
    const scrollableChat = getScrollableChat();
    if (!scrollableChat || !scrollableChat?.component) return;
    if (scrollableChat.element.classList.contains('chat-scrollable-area__message-container--paused')) return;
    scrollableChat.component.scrollToBottom();
}
