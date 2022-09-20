import * as Peeker from '$Peeker';
import { getRaidInfo } from '$Utils/twitch';

let blacklistedRaids = ['komaczek'];

Peeker.add(() => {
    const raid = document.querySelector('div[data-test-selector="raid-banner"]');
    if (!raid || !Peeker.canCreate('autoLeaveRaid', raid)) return;
    return raid;
}, callback);

function callback() {
    const raid = getRaidInfo();
    if (!raid) return;
    if (blacklistedRaids.includes(raid.props.targetChannel.login.toLowerCase())) {
        raid.handleLeaveRaid();
    }
}
