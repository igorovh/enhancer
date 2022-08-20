document.addEventListener('enhancer-watchtime', (event) => {
    chrome.runtime.sendMessage({ type: 'watchtime', id: 'watch', data: event.detail });
});
