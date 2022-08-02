import * as Settings from '$Settings';

Settings.registerUpdate('hideNoIcons', update)

// Development Only
update(true);

function update(value) {
    if(value) document.body.classList.add('te-hide-no-icons');
    else document.body.classList.remove('te-hide-no-icons');
}