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
        let groups = await fetch('https://teapi.vopp.top/groupBadges');
        groups = await groups.json();
        const currGroups = document.querySelector('#groups');
        groups.forEach(group => {
            currGroups.innerHTML += `
            <li style="margin: 5px 0;">
                <img src="${group.icon}" alt="${group.name}" width="30px" style="margin: -5px 0;">
                <span style="font-size: 20px;"><strong>${group.name}: </strong>${group.streamers.join(', ')}.</span>
            </li>
        `
        });
    });
});

function updateTable() {
    document.querySelectorAll('tbody').forEach(element => {
        if(!element.classList.contains('dont-delete')) element.remove();
    });
    const iconsTable = document.getElementById('te-icons');
    icons.forEach(icon => {
        iconsTable.innerHTML += `
        <tr>
            <td>${icon.name}</td>
            <td><img src="${icon.icon}" title="${icon.name} Viewer"></td>
            <td><input type="button" value="Remove" streamer="${icon.name}" class="remove-icon"></td>
        </tr>
        `
    });
    const actionsTable = document.getElementById('te-actions');
    actions.forEach(action => {
        actionsTable.innerHTML += `
        <tr>
            <td>${action.name}</td>
            <td>${actionsText[action.action]}</td>
            <td><input type="button" value="Remove" streamer="${action.name}" class="remove-action"></td>
        </tr>
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