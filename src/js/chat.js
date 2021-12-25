let users = [];
let cache = [];
let usersChecker, cacheChecker;

let groups = [];

let customIcons = [];
let actions = [];

let blocklist = [
    'streamelements',
    'streamlabs',
    'nightbot',
    'moobot',
    'lewusbot'
];

let chatTarget;
let chatObserver;

let chatOptions;

chrome.storage.sync.get({
    te_viewer_badges: true,
    te_group_badges: true,
    te_viewer_actions: true,
    te_viewer_actions: true,
    te_viewer_custom_icons: [],
    te_viewer_actions_list: []
}, async (options) => {
    chatOptions = options;
    customIcons = options.te_viewer_custom_icons;
    if(options.te_viewer_actions) actions = options.te_viewer_actions_list;
    if(options.te_viewer_badges || options.te_group_badges || options.te_viewer_actions) {
        if(options.te_group_badges) {
            let groupsJson = await fetch('https://teapi.vopp.top/groupBadges');
            groupsJson = await groupsJson.json();
            if(groupsJson.length > 0) groups = groupsJson;
        }
        setInterval(async () => {
            const newChatTarget = document.querySelector('.chat-scrollable-area__message-container');
            if(!newChatTarget) return;
            chatTarget = newChatTarget;
            if(chatTarget.classList.contains('wic-injected')) return;
            cache = [];
            users = [];
            startCache();
            startUsers();
            chatTarget.classList.add('wic-injected');
            console.info('[te] Injecting chat observer...');
            if(chatObserver) chatObserver.disconnect();
            createObserver(chatTarget);
        }, 1000);
    }
});

function createObserver(chatTarget) {
    const callback = function(mutationList, observer) {
        for(const mutation of mutationList) {
            if(mutation.type === 'childList' && mutation.addedNodes) {
                for(const element of mutation.addedNodes) checkMessage(element)
            }
        }
    }
    chatObserver = new MutationObserver(callback);
    chatObserver.observe(chatTarget, {attributes: true, childList: true});
    console.info(`[te] Chat observer has been started.`)
}


function checkMessage(element) {
    let name = element.querySelector('.chat-line__username')?.textContent.toLowerCase();
    if(!name) return;
    if(name.includes('(')) name = name.split('(', ')')[1];
    if(blocklist.includes(name)) return;
    element.classList.add(`te-${name}-message`)
    const badges = element.querySelector('.chat-line__username-container')?.children[0] || element.querySelector('.chat-line__message--badges');
    if(!badges) return;
    badges.classList.add(`te-${name}-message-badges`);
    const cacheUser = cache.find(user => user.name === name);
    if(cacheUser) {
        cacheUser.ttl = 600;
        if(actions.length > 0) {
            const action = actions.find(action => action.name.toLowerCase() === cacheUser.streamer.toLowerCase());
            if(action) doAction(action, element);
        }
        if(chatOptions.te_viewer_badges || chatOptions.te_group_badges) addBadge(cacheUser, badges);
    } else addUser(name);
}

function startCache() {
    if(cacheChecker) clearInterval(cacheChecker);
    cacheChecker = setInterval(() => {
        cache.forEach(user => user.ttl = user.ttl - 10);
        cache = cache.filter(user => user.ttl > 0);
        console.info(`[te] Current cached users: ${cache.length}`);
    }, 1000 * 10);
}

function startUsers() {
    if(usersChecker) clearInterval(usersChecker);
    usersChecker = setInterval(async () => {
        if(users.length < 1) return;
        const tempUsers = users.slice();
        tempUsers.length = 100;
        const usersString = tempUsers.join(',');
        console.info(`[te] Found ${users.length} new viewers.`);
        users = [];
        const data = await fetch(`https://vislaud.com/api/chatters?logins=${usersString}`);
        const json = await data.json();
        json.forEach(cacheUser);
        tempUsers.forEach(tempUser => users = users.filter(user => user !== tempUser));
    }, 1000 * 5);
}

function cacheUser(user) {
    if(user.watchtimes.length > 1) {
        user.watchtimes.sort((a, b) => {
            return b.watchtime - a.watchtime;
        });
        const streamer = user.watchtimes[0].streamer;
        const dataUser = {
            name: user.login,
            streamer: streamer.displayName,
            badge: streamer.profileImageUrl,
            ttl: 600
        };
        if(groups.length > 0) {
            const group = groups.find(group => group.streamers.includes(dataUser.streamer.toLowerCase()));
            if(group) {
                dataUser.streamer = group.name;
                dataUser.badge = group.icon;
            }
        }
        if(customIcons.length > 0) {
            const custom = customIcons.find(icon => icon.name.toLowerCase() === dataUser.streamer.toLowerCase());
            if(custom) dataUser.badge = custom.icon;
        }
        if(actions.length > 0) {
            const action = actions.find(action => action.name.toLowerCase() === dataUser.streamer.toLowerCase());
            if(action) chatTarget.querySelectorAll(`.te-${dataUser.name}-message`).forEach(messagesWrapper => doAction(action, messagesWrapper));
        }
        cache.push(dataUser);
        if(chatOptions.te_viewer_badges || chatOptions.te_group_badges) {
            chatTarget.querySelectorAll(`.te-${dataUser.name}-message-badges`).forEach(badgesWrapper => addBadge(dataUser, badgesWrapper));
        }
    }
}

function addUser(name) {
    if(users.includes(name)) return;
    users.push(name);
}

function addBadge(badge, badges) {
    const image = new Image();
    image.onload = () => {
        if(badges.children.length < 1) badges.appendChild(image);
        else badges.insertBefore(image, badges.children[0]);
    };
    image.src = badge.badge;
    image.className = 'chat-badge viewer-badge ffz-badge';
    image.title = `${badge.streamer} Viewer`;
    badges.classList.remove(`te-${badge.name}-message-badges`);
}

function doAction(action, message, old = false) {
    if(action.action === 'hide') {
        console.log('[te]', message.querySelector('[data-test-selector="chat-line-message-body"]'));
        const content = message.querySelector('[data-test-selector="chat-line-message-body"]') || message.querySelector('.message');
        content.innerHTML = `<span class="te-hidden-message">This message was hidden by Twitch Enhancer.</span>`
    }
    if(action.action === 'delete' && !old) message.remove();
}