export const honors = [];

export async function loadHonors() {
    const data = await fetch('https://teapi.vopp.top/honors');
    const json = await data.json();
    honors.push(...json);
}
