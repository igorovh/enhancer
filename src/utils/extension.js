const version = JSON.parse(localStorage.getItem('_enhancerInfo'))?.version || 'unknown';

export function getVersion() {
    return version ?? 'unknown';
}
