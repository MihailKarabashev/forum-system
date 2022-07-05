import { getToken } from "./authService";
export const baseUrl = 'https://localhost:7229/api';

export const likePost = (postId) => {
    return fetch(`${baseUrl}/posts/reaction/like/${postId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    }).then(res => res.json());
}