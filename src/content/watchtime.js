document.addEventListener('enhancer-watchtime-update', (event) => {
    chrome.runtime.sendMessage({ type: 'watchtime', id: 'watch', data: event.detail }, (response) => {
        if (response) document.dispatchEvent(new CustomEvent('enhancer-watchtime-data', { detail: response }));
    });
});
