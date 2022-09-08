const filePath = JSON.parse(localStorage.getItem('_enhancerInfo')).files.url;

export function getFile(path) {
    return filePath.replace('%path%', path);
}
