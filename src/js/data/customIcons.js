export const customIcons = [];

troll();

function troll() {
    const date = new Date();
    console.log(`[te] looking for :tf: ${date.getDate()} / ${date.getMonth()} `);
    if(date.getDate() === 1 && date.getMonth() === 3) {
        console.log('[te] :tfing:');
        customIcons.push({
            icon: 'https://teapi.vopp.top/groups/yfl.png',
            name: 'hopaki'
        });
        customIcons.push({
            icon: 'https://static-cdn.jtvnw.net/emoticons/v2/847084/static/light/4.0',
            name: 'yfl'
        });
        customIcons.push({
            icon: 'https://staticdelivery.nexusmods.com/mods/3333/images/thumbnails/7/7-1607466256-704411499.png',
            name: 'slayproxx'
        });
        customIcons.push({
            icon: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3eec20cd-3592-409b-9b9d-7968dc3ee070-profile_image-300x300.png',
            name: 'xayoo industries'
        });
        customIcons.push({
            icon: 'https://wcapi.vopp.top/groups/xayoo_industries.png',
            name: 'franio'
        });
        customIcons.push({
            icon: 'https://wcapi.vopp.top/groups/xayoo_industries.png',
            name: 'szymoool'
        });
        customIcons.push({
            icon: 'https://static-cdn.jtvnw.net/jtv_user_pictures/9f79024f-c924-46cf-9a74-09847862d227-profile_image-300x300.png',
            name: 'lewus'
        });
        customIcons.push({
            icon: 'https://cdn.7tv.app/emote/61e66d3b1f8f9d5cf633af95/4x',
            name: 'edenitoo'
        });
        customIcons.push({
            icon: 'https://cdn.7tv.app/emote/620d8b5e180be49d725b9a87/4x',
            name: 'furazek'
        });
    }
}