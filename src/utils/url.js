export function getName() {
    let url = window.location.href;
    url = url.replace(/(^\w+:|^)\/\//, '');
    const elements = url.split('/');
    let name = elements[1];
    if(name === 'popout' || elements[0].includes('dashboard')) name = elements[2];
    if(name.includes('?')) name = name.substring(0, name.indexOf('?'));
    return name;
}