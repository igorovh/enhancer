chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.action === 'checkUser') {
        console.log(`Checking user ${msg.name}...`);
        fetch(`https://xayo.pl/api/watchtime/${msg.name}`).then(data => data.json()).then(sendResponse);
        return true;
    } else if(msg.action === 'settings') {
        chrome.runtime.openOptionsPage();
    }
});