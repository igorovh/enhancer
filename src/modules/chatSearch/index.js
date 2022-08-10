// import * as Peeker from '$Peeker';
// import Component from './component';
import { getChatMessages } from '$Utils/twitch';

// Peeker.add(() => {
//     return !document.querySelector('#te-settings');
// }, callback);

// function callback() {

// }

window.addEventListener('keydown', event => {
    if(event.ctrlKey && event.shiftKey && event.key === 'F') {
        resetMessages();
        serachMessages('vopp_bot', 'test');
    }
});

//TODO When is in the serach mode then dont show new messages 
//TODO Update: OR NOT? - Upadte new messages if they should be highlighted

function serachMessages(username, content) {
    const messages = parse(getChatMessages());
    const highlighted = [];
    for(const message of messages) {
        let highlight = true;

        if(username && username.length > 1 && !message.author.toLowerCase().startsWith(username.toLowerCase())) highlight = false;
        if(content && content.length > 1 && !message.content.includes(content)) highlight = false;

        if(highlight) highlighted.push(message);
    }
    highlighted.forEach(message => message.element.classList.add('te-search-messages'));
}

function resetMessages() {
    document.querySelectorAll('.te-search-messages').forEach(message => message.classList.remove('te-search-messages'));
}

function parse(messages) {
    const parsed = [];
    for(const message of messages) {
        const author = message.component?.props?.message?.user?.displayName;
        const content = message.component?.props?.message?.message;
        if(!author || !content) return
        parsed.push({ element: message.element, author, content });
    }
    return parsed;
}