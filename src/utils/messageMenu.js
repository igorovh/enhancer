let options = [];

export function addOption(option) {
    options.push(option);
    options = options.sort((a, b) => {
        return a.position - b.position;
    });
}

export function getOptions(message, data) {
    return options.filter((option) => option.condition(message, data));
}
