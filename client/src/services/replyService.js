import { getToken } from "./authService";

export const baseUrl = 'https://localhost:7229/api';

export const createPostReply = (postId, description) => {
    return fetch(`${baseUrl}/replies`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ description, postId })
    }).then(res => res.json());
};
