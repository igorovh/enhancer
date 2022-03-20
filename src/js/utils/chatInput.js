export function addText(message, pretty, focus) {
    const input = document.querySelector('textarea[data-a-target="chat-input"]');
    if(input) {
        let value = input.value || input.textContent;
        message = fixMessage(message, value);
        const nativeInput = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
        nativeInput.call(input, message);
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
        if(focus) input.focus();
    } else {
        twitch.getChatInput().props.onChange({ target: { value: fixMessage(message, twitch.getAutocompleteHandler().state.value) }});
        twitch.getChatInput().focus();
    }
}

function fixMessage(message, value) {
    if(!value.endsWith(' ') && value.length > 0) message = ' ' + message;
    return value + message;
}