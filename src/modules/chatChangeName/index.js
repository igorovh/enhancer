// import * as Peeker from '$Peeker';

// Peeker.registerListener('messageEvent', callback);

// const channels = {
//     czarny_animekkk1337: {
//         czarny_animekkk1337: 'testowa nazwa',
//     },
// };

// function callback(message, data) {
//     if (!data?.props || !data?.props?.message?.user) return;

//     const channel = channels[data.props.channelLogin.toLowerCase()];
//     if (!channel) return;
//     const updated = channel[data.props.message.user.userLogin.toLowerCase()];
//     if (!updated) return;

//     changeName(message, updated);
// }

// function changeName(message, username) {
//     const usernameWrapper = message.querySelector('.chat-author__display-name');
//     if (usernameWrapper) usernameWrapper.textContent = username;
// }
