export default () => {
    const count = document.createElement('div');
    count.id = 'te-chatters-count';
    count.innerHTML = `
        ???
        <span class="te-tooltip te-settings te-tooltip-left">Chatters Count</span>
    `;
    return count;
};
