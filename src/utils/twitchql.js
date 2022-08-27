const GQL_ENDPOINT = 'https://gql.twitch.tv/gql';
const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';

export let token;

async function send(query, variables, auth) {
    return new Promise((resolve, reject) => {
        fetch(GQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Client-ID': CLIENT_ID,
                Authorization: auth && token ? `OAuth ${token}` : undefined,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        })
            .then((response) => response.json())
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
}

export default {
    setToken(accessToken) {
        this.token = accessToken;
    },

    async query(query, variables, auth) {
        return await send(query, variables, auth);
    },
};
