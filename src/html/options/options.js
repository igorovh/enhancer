let icons = [];
let actions = [];

let actionsText = {
    hide: 'Hide message',
    delete: 'Delete message',
    ban: 'Ban user',
    ignore: 'Ignore user'
}

window.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        te_viewer_custom_icons: [],
        te_viewer_actions_list: []
    }, async (options) => {
        icons = options.te_viewer_custom_icons;
        actions = options.te_viewer_actions_list;
        updateTable();
        const currGroups = document.querySelector('#groups');
        currGroups.innerHTML = `
        <div id="groups__loading">
            <svg style="margin-bottom: 2em" width="80" height="20" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#A970FF" aria-label="audio-loading"><circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fillOpacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" attributeName="fillOpacity" from="1" to="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fillOpacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fillOpacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle></svg>
            <div class="groups__loading--description">Loading groups...</div>
        </div>`;
        await fetch('https://teapi.vopp.top/groupBadges')
            .then(res => res.json())
            .then(groups => {
                currGroups.innerHTML = "<h1>Current Groups</h1>";
                groups.forEach(group => {
                    currGroups.innerHTML += `
                    <div class="group">
                        <div class="group__card">
                            <div class="group__name">${group.name}</div>
                            <img src="${group.icon}" alt="${group.name}" class="group__image">
                        </div>
                        <div class="group__members">${group.streamers.join(', ')}.</div>
                    </div>
                `
                });
            }).catch(err => currGroups.innerHTML = `<h1>Current Groups</h1><div id="groups__loading">Error while loading groups. Refresh the page.</div>`);

            if(!browser) var browser = chrome;
            document.querySelector("#version").textContent = `v${browser.runtime.getManifest().version}`;
    
    });
    const tabs = document.querySelectorAll(".settings__tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", selectTab);
    });
    appendListeners();
    loadSettings();
});

function updateTable() {
    document.querySelectorAll('tbody').forEach(element => {
        if(!element.classList.contains('dont-delete')) element.remove();
    });
    const iconsTable = document.getElementById('te-icons');
    icons.forEach(icon => {
        iconsTable.innerHTML += `
        <tbody class="row">
            <tr>
                <td><div class="td__inner">${icon.name}</div></td>
                <td><div class="td__inner"><img class="custom__icon--img" src="${icon.icon}" title="${icon.name} Viewer"></div></td>
                <td><div class="td__inner"><button value="Remove" streamer="${icon.name}" class="remove-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="-8.5 -7.5 30 30">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            <span style="margin-right:10px">Remove</span></button></div></td>
            </tr>
        </tbody>
        `
    });
    const actionsTable = document.getElementById('te-actions');
    actions.forEach(action => {
        actionsTable.innerHTML += `
        <tbody class="row">
            <tr>
                <td><div class="td__inner">${action.name}</div></td>
                <td><div class="td__inner">${actionsText[action.action]}</div></td>
                <td><div class="td__inner"><button value="Remove" streamer="${action.name}" class="remove-action"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="-8.5 -7.5 30 30">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            <span style="margin-right:10px">Remove</span></button></div></td>
            </tr>
        </tbody>
        `
    });
    document.querySelectorAll('.remove-icon').forEach(button => button.addEventListener('click', removeIcon, false));
    document.querySelectorAll('.remove-action').forEach(button => button.addEventListener('click', removeAction, false));
    document.querySelector('#add-action').addEventListener('click', addAction);
    document.querySelector('#add-icon').addEventListener('click', addIcon);
}

function save() {
    chrome.storage.sync.set({
        te_viewer_custom_icons: icons,
        te_viewer_actions_list: actions
    });
    updateTable();
}

function addIcon() {
    const name = document.forms.icons.name.value.toLowerCase();
    if(icons.find(icon => icon.name === name)) return alert('This user already exist in this table.');
    const icon = document.forms.icons.icon.value;
    if(name.length < 1 || icon.length < 1) return alert('Name or icon is empty.');
    icons.push({
        name,
        icon
    });
    save();
}

function removeIcon(evt) {
    icons = icons.filter(icon => icon.name.toLowerCase() !== evt.currentTarget.getAttribute('streamer'));
    save();
}

function addAction() {
    const name = document.forms.actions.name.value.toLowerCase();
    if(actions.find(action => action.name === name)) return alert('This user already exist in this table.');
    if(name.length < 1) return alert('Name is empty.');
    actions.push({
        name,
        action: document.forms.actions.action.value
    });
    save();
}

function removeAction(evt) {
    actions = actions.filter(action => action.name.toLowerCase() !== evt.currentTarget.getAttribute('streamer'));
    save();
}
function selectTab() {
    const tabs = document.querySelectorAll(".settings__tab");
    tabs.forEach(tab => {
        tab.classList.remove("settings__tab--active");
    });
    this.classList.add("settings__tab--active");
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.classList.remove("option--active");
        if(option.classList.contains(this.classList[1])){
            option.classList.add("option--active");
        }
    });
}

function appendListeners(){
    ;[
        document.querySelector('#te-xayo-format-full'),
        document.querySelector('#te-xayo-format-hour'),
        document.querySelector('#te-xayo-service-auto'),
        document.querySelector('#te-xayo-service-xayo'),
        document.querySelector('#te-xayo-service-vislaud'),
        document.querySelector('#te-real-vod-time'),
        document.querySelector('#te-viewer-badges'),
        document.querySelector('#te-group-badges'),
        document.querySelector('#te-viewer-actions')
    ].forEach(item => {
        item.addEventListener("change", () => {
            const format = document.querySelector('#te-xayo-format-full').checked ? "full" :  "hour";
            const service = document.querySelector('#te-xayo-service-auto').checked ? "auto" : document.querySelector('#te-xayo-service-xayo').checked ? "xayo" : "vislaud";
            chrome.storage.sync.set({
                te_xayo_format: format,
                te_xayo_service: service,
                te_real_vod_time: document.querySelector('#te-real-vod-time').checked,
                te_viewer_badges: document.querySelector('#te-viewer-badges').checked,
                te_group_badges: document.querySelector('#te-group-badges').checked,
                te_viewer_actions: document.querySelector('#te-viewer-actions').checked
            });
        });
    });
}
    
function loadSettings() {
    chrome.storage.sync.get({
        te_xayo_format: 'full',
        te_xayo_service: 'auto',
        te_real_vod_time: true,
        te_viewer_badges: true,
        te_group_badges: true,
        te_viewer_actions: true,
    }, options => {
        document.querySelector(`#te-xayo-service-${options.te_xayo_service}`).checked = true;
        document.querySelector(`#te-xayo-format-${options.te_xayo_format}`).checked = true;
        document.querySelector('#te-real-vod-time').checked = options.te_real_vod_time;
        document.querySelector('#te-viewer-badges').checked = options.te_viewer_badges;
        document.querySelector('#te-group-badges').checked = options.te_group_badges;
        document.querySelector('#te-viewer-actions').checked = options.te_viewer_actions;
    });
}