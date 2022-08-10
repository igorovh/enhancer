export default () => {
    const button = document.createElement('a');
    button.href = '#';
    button.rel = 'noopener noreferrer';
    button.id = 'te-clip-download';
    button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
    </svg>
    <span class="te-tooltip te-download-clip te-tooltip-top" style="bottom: 3em">Download this clip</span>`;
    return button;
};
