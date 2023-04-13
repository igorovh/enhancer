import * as Settings from '$Settings';

Settings.registerUpdate('hideMomentBadges', update);

function update(value) {
    if (value) document.body.classList.add('te-hide-moment-badges');
    else document.body.classList.remove('te-hide-moment-badges');
}

update(Settings.get('hideMomentBadges'));
