import { getChatInput, getAutoCompleteHandler, getChat } from './twitch';

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
