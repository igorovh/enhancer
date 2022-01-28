export function getName(url) {
    url = url.replace(/(^\w+:|^)\/\//, '');
    const elements = url.split('/');
    let name = elements[1];
    if(name === 'popout' || elements[0].includes('dashboard')) return elements[2];
    if(name.includes('?')) name = name.substring(0, name.indexOf('?'));
    return name;
}