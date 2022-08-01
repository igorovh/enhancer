export default (links, name) => {
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.id = 'te-quick-links';
    const buttons = [];
    links.forEach(link => buttons.push(`<a target="_blank" href="${link.url.replace('%name%', name)}">${link.name}</a>`));
    buttonsWrapper.innerHTML += buttons.join(' · ');
    return buttonsWrapper;
};