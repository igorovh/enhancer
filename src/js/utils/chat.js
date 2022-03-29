export function sendMessage(message) {
    document.querySelector('.chat-scrollable-area__message-container').innerHTML +=
        `<div class="Layout-sc-nxg1ff-0 chat-line__status">
            ${message}
        </div>`;
}