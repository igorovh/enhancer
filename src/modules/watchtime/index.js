import { getPlayer }from '$Utils/twitch';

setInterval(() => {
    const player = getPlayer();
    if(!player) return;
    if(window.location.href.endsWith('twitch.tv/')) return; // Main page
    const paused = player.props.mediaPlayerInstance.core.paused;
    if(paused) return;
    document.dispatchEvent(new CustomEvent('enhancer-watchtime', { detail: { channel: player.props.content.channelLogin } }));
}, 1000);
