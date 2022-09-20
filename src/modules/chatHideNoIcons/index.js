import * as Settings from '$Settings';

Settings.registerUpdate('hideNoBadges', update);

function update(value) {
    if (value) document.body.classList.add('te-hide-no-badges');
    else document.body.classList.remove('te-hide-no-badges');
}

update(Settings.get('hideNoBadges'));
