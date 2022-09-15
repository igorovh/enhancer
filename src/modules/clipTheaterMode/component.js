export default () => {
    const button = document.createElement('a');
    button.href = '#';
    button.rel = 'noopener noreferrer';
    button.id = 'te-clip-theatermode';
    button.innerHTML = `
    <svg width="20px" height="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScIconSVG-sc-1bgeryd-1 ifdSJl">
        <g><path d="M2 15V5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2zm2 0V5h7v10H4zm9 0h3V5h-3v10z" fill-rule="evenodd" clip-rule="evenodd"></path></g>
    </svg>
    <span class="te-tooltip te-theatermode-clip te-tooltip-top" style="bottom: 3em">Theater Mode</span>`;
    return button;
};
