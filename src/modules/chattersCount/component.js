export default () => {
    const count = document.createElement('span');
    count.id = 'te-chatters-count';
    count.innerHTML = `
        [???]
        <span class="te-tooltip te-chatters-count te-tooltip-left">Chatters Count</span>
    `;
    count.title = 'Chatters Count';
    return count;
};
