export const groups = [{
    name: 'zjeby',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg',
    streamers: ['furazek']
}];

export async function loadGroups() {
    const data = await fetch('https://teapi.vopp.top/groupBadges');
    const json = await data.json();
    groups.push(...json);
}

loadGroups();