export default (id, amount) => {
    const bumps = document.createElement('div');
    bumps.className = 'te-bumps';
    bumps.innerHTML = `
        +${amount}
        <span class="te-tooltip te-bump-${id} te-tooltip-top">Bumps</span>
    `;
    return bumps;
};
