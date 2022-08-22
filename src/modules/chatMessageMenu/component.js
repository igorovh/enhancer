export default (options, message, data) => {
    const div = document.createElement('div');
    div.id = 'te-message-menu';
    if (options?.length < 1) div.innerHTML = '<span>There is no options for this message :<</span>';
    for (const option of options) {
        const span = document.createElement('span');
        span.className = 'te-message-menu-option';
        span.textContent = option.text;
        span.addEventListener('click', () => {
            if (option.callback(message, data)) div.remove();
        });
        div.appendChild(span);
    }
    return div;
};