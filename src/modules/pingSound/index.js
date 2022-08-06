import * as Peeker from '$Peeker';
import * as Settings from '$Settings';
import { getUsername } from '$Utils/chat';

let sound = Settings.get('pingSound');

Settings.registerUpdate('pingSound', value => sound = value);

Peeker.registerListener('messageEvent', callback);

let username = getUsername();

const audio = new Audio('http://localhost:2565/sounds/notification.ogg'); //TODO Change

function callback(message, data) {
    if(!sound) return;
    if(!data.props.message) return;
    if(!data.props.message.message) return;
    if(!username) {
        username = getUsername();
        return;
    }
    if(data.props.message.message.includes(username)) {
        if(!audio.paused) audio.currentTime = 0;
        else audio.play();
    }
}