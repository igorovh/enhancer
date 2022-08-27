import { LOCAL_HONORS } from '$Utils/constants';

export function findHonor(username) {
    return LOCAL_HONORS.find((honor) => honor.username.toLowerCase() === username.toLowerCase());
}
