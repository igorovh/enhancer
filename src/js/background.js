chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(`Checking user ${msg.name}...`);
    fetch(`https://xayo.pl/api/watchtime/${msg.name}`).then(data => data.json()).then(sendResponse);
    return true;
});