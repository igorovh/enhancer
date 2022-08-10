const testHonors = [
    {
        username: 'czarny_animekkk1337',
        type: 'other',
    },
];

export function findHonor(username) {
    return testHonors.find((honor) => honor.username.toLowerCase() === username.toLowerCase());
}
