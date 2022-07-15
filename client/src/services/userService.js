import { getToken } from "./authService";
export const baseUrl = 'https://localhost:7229/api';


export const getUserPosts = (userId) => {
    return fetch(`${baseUrl}/user/post-statistics/${userId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => res.json());
}
