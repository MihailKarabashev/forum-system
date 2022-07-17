import { getToken } from "./authService";
export const baseUrl = 'https://localhost:7229/api';


export const getUserPosts = () => {
    return fetch(`${baseUrl}/user/post-statistics`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => res.json());
}

export const getUserReplies = () => {
    return fetch(`${baseUrl}/user/replies-statistics`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(res => res.json());
}
