// import * as Peeker from '$Peeker';
// import * as Settings from '$Settings';
// import { getChatMessage } from '$Utils/twitch';

// Peeker.registerListener('messageEvent', callback);

// let enabled = Settings.get('chatConnectMessage');

// Settings.registerUpdate('chatConnectMessage', (value) => (enabled = value));

// function callback(message, data) {
//     if (!enabled) return;
//     if (!data.props.message) return;

//     const previousMessage = message.previousElementSibling;
//     if (!previousMessage) return;
//     const previousMessageData = getChatMessage(previousMessage);
//     if (!previousMessageData) return;

//     if (data?.props?.message?.user.id === previousMessageData?.props?.message?.user.id)
//         message.classList.add('te-connect-message');
// }
