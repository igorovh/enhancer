const timeStructure = {
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
}

export function formatTime(seconds, format) {
    if(format === 'hour') {
        return `${(seconds / 60 / 60).toFixed(2)} hours`;
    } else {
        let result = {};
        Object.keys(timeStructure).forEach(key => {
            result[key] = Math.floor(seconds / timeStructure[key]);
            seconds -= result[key] * timeStructure[key];
        });
        const timeStrings = [
            (result.week > 0 ? `${result.week} ${result.week > 1 ? 'weeks': ' week'},` : ''),
            (result.day > 0 ? `${result.day} ${result.day > 1 ? 'days': ' day'},` : ''),
            (result.hour > 0 ? `${result.hour} ${result.hour > 1 ? 'hours': ' hour'},` : ''),
            (result.minute > 0 ? `${result.minute} min,` : '')
        ];
        const timeString = timeStrings.join(' ');
        return timeString.replace(/\s*$/,'').replace(/,$/, '');
    }
}