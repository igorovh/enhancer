document.addEventListener('enhancer-watchtime', (event) => {
    chrome.runtime.sendMessage(event.detail, (response) => {
        if (response) document.dispatchEvent(new CustomEvent('enhancer-watchtime-response', { detail: response }));
    });
});
