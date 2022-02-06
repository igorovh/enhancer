export function fixName(name) {
    if(name.includes('(')) name = name.substring(name.indexOf('(') + 1, name.indexOf(')'));
    return name;
} 