export default (text = 'Hello world!') => {
    const div = document.createElement('div');
    div.id = 'te-chat-island';
    div.classList.add('te-chat-island-hidden');
    div.textContent = text;
    return div;
};
