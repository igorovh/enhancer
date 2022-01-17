let users = [];
let usersChecker;

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
            users = [];
            startUsers();
            chatTarget.classList.add('wic-injected');
            console.info('[te] Injecting chat observer...');
            if(chatObserver) chatObserver.disconnect();
            createObserver(chatTarget);
        }, 1000);
    }
});

function createObserver(chatTarget) {
    const callback = (mutationList, observer) => {
        for(const mutation of mutationList) {
            if(mutation.type === 'childList' && mutation.addedNodes) {
                for(const element of mutation.addedNodes) checkMessage(element)
            }
        }
    }
    chatObserver = new MutationObserver(callback);
    chatObserver.observe(chatTarget, { attributes: true, childList: true });
    console.info(`[te] Chat observer has been started.`)
}


async function checkMessage(element) {
    let nameElement = element.querySelector('.chat-line__username');
    if(!nameElement) return;
    let name = nameElement.textContent.toLowerCase();
    if(!name) return;
    if(name.includes('(')) name = name.substring(name.indexOf('(') + 1, name.indexOf(')'));
    if(blocklist.includes(name)) return;
    element.classList.add(`te-${name}-message`)
    const badges = element.querySelector('.chat-line__username-container')?.children[0] || element.querySelector('.chat-line__message--badges');
    if(!badges) return;
    checkHonor(name, nameElement);
    badges.classList.add(`te-${name}-message-badges`);
    const cacheUser = await getUser(name);
    if(cacheUser && !cacheUser.error) {
        cacheUser.ttl = 600;
        if(actions.length > 0) {
            const action = actions.find(action => action.name.toLowerCase() === cacheUser.streamer.streamer.toLowerCase());
            if(action) doAction(action, element);
        }
        if(chatOptions.te_viewer_badges || chatOptions.te_group_badges) addBadge(cacheUser, badges);
    } else checkUser(name);
}

function startUsers() {
    if(usersChecker) clearInterval(usersChecker);
    usersChecker = setInterval(async () => {
        if(users.length < 1) return;
        const tempUsers = users.slice(0, 100);
        const usersString = tempUsers.join(',');
        console.info(`[te] Found ${users.length} new viewers.`);
        users = [];
        const data = await fetch(`https://teapi.vopp.top/chat/${usersString}?name=${getName()}`); // TODO Fix if url contains "?""
        const json = await data.json();
        json.forEach(cacheUser);
        tempUsers.forEach(tempUser => users = users.filter(user => user !== tempUser));
    }, 1000 * 5);
}

function cacheUser(user) {
    if(user.watchtimes.length > 0) {
        user.watchtimes.sort((a, b) => {
            return b.watchtime - a.watchtime;
        });
        const streamer = user.watchtimes[0].streamer;
        const dataUser = {
            name: user.login,
            streamer: {
                streamer: streamer.displayName,
                badge: streamer.profileImageUrl
            }
        };
        addUser(dataUser);
        if(groups.length > 0) {
            const group = groups.find(group => group.streamers.includes(dataUser.streamer.streamer.toLowerCase()));
            if(group) {
                dataUser.streamer.streamer = group.name;
                dataUser.streamer.badge = group.icon;
            }
        }
        if(customIcons.length > 0) {
            const custom = customIcons.find(icon => icon.name.toLowerCase() === dataUser.streamer.streamer.toLowerCase());
            if(custom) dataUser.streamer.badge = custom.icon;
        }
        if(actions.length > 0) {
            const action = actions.find(action => action.name.toLowerCase() === dataUser.streamer.streamer.toLowerCase());
            if(action) chatTarget.querySelectorAll(`.te-${dataUser.name}-message`).forEach(messagesWrapper => doAction(action, messagesWrapper));
        }
        if(chatOptions.te_viewer_badges || chatOptions.te_group_badges) {
            chatTarget.querySelectorAll(`.te-${dataUser.name}-message-badges`).forEach(badgesWrapper => addBadge(dataUser, badgesWrapper));
        }
    }
}

function checkUser(name) {
    if(users.includes(name)) return;
    users.push(name);
}

function addBadge(badge, badges) {
    const image = new Image();
    image.onload = () => {
        if(badges.children.length < 1) badges.appendChild(image);
        else badges.insertBefore(image, badges.children[0]);
    };
    image.src = badge.streamer.badge;
    image.className = 'chat-badge viewer-badge ffz-badge';
    image.setAttribute('streamer', badge.streamer.streamer);
    image.addEventListener('mouseenter', showPopup, false);
    image.addEventListener('mouseleave', hidePopup, false);
    badges.classList.remove(`te-${badge.name}-message-badges`);
}

function doAction(action, message, old = false) {
    if(action.action === 'hide') {
        const content = message.querySelector('[data-test-selector="chat-line-message-body"]') || message.querySelector('.message');
        content.innerHTML = `<span class="te-hidden-message">This message was hidden by Twitch Enhancer.</span>`
    }
    if(action.action === 'delete' && !old) message.remove();
}

function showPopup(event) {
    let popup = document.querySelector('#te-badge-popup');
    if(popup) popup.remove();
    popup = document.createElement('div');
    popup.id = 'te-badge-popup';
    const streamer = event.srcElement.getAttribute('streamer');
    popup.innerHTML += `<img src="${event.srcElement.src}" alt="${streamer}">`;
    popup.innerHTML += `<span>${streamer}</span>`;
    let y = event.pageY - 50;
    popup.style.top = (y < 0 ? 0 : y) + 'px';
    popup.style.left = (event.pageX + 25) + 'px';
    document.getElementById('root').children[0].appendChild(popup);
}

function hidePopup() {
    const popup = document.querySelector('#te-badge-popup');
    if(!popup) return;
    popup.remove();
}

function checkHonor(name, element) {
    if(!honors.find(honor => honor.name.toLowerCase() === name.toLowerCase())) return; //usercard.js
    const color = element.style.color;
    element.style.textShadow = `${color} 0 0 10px`;
}