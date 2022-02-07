export const honors = [];

export async function loadHonors() {
    console.log('[te]', 'test1');
    const data = await fetch('https://teapi.vopp.top/honors');
    const json = await data.json();
    honors.push(...json);
    console.log('[te]', honors);
}
