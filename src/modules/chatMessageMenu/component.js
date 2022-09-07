export default (options, message, data) => {
    const div = document.createElement('div');
    div.id = 'te-message-menu';
    if (options?.length < 1) div.innerHTML = '<span>There is no options for this message :</span>';
    for (const option of options) {
        const available = option.available(message, data);
        const span = document.createElement('span');
        span.className = 'te-message-menu-option';
        const text = `${option.icon}<span>${available === true ? option.text : available}</span>`;
        span.innerHTML = text;
        if (available === true)
            span.addEventListener('click', () => {
                if (option.callback(message, data)) div.remove();
            });
        div.appendChild(span);
    }
    return div;
};
