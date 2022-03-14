export const groups = [];

export async function loadGroups() {
    const data = await fetch('https://teapi.vopp.top/groupBadges');
    const json = await data.json();
    groups.push(...json);
}

loadGroups();