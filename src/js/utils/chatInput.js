let input;

export function addText(message, pretty) {
    if(!input) input = document.querySelector('textarea[data-a-target="chat-input"]');
    let value = input.value || input.textContent;
    if(pretty && !value.endsWith(' ')) message = ' ' + message;
    message = value + message;
    const nativeInput = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    nativeInput.call(input, message);
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
}