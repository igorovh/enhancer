export function addText(message, pretty, focus) {
    const input = document.querySelector('textarea[data-a-target="chat-input"]');
    if(!input) return;
    let value = input.value || input.textContent;
    if(pretty && !value.endsWith(' ') && value.length > 0) message = ' ' + message;
    message = value + message;
    const nativeInput = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    nativeInput.call(input, message);
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
    if(focus) input.focus();
}