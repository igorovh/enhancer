const options = [];

export function addOption(option) {
    options.push(option);
}

export function getOptions(message, data) {
    return options.filter((option) => option.condition(message, data));
}
