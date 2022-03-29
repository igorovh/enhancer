export const honors = [
    {
        type: 'permanent',
        name: 'czarny_animekkk1337',
        description: 'For developing.'
    }
];

export async function loadHonors() {
    const data = await fetch('https://teapi.vopp.top/honors');
    const json = await data.json();
    honors.push(...json);
}

loadHonors();
