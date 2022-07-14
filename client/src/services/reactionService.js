import { getToken } from "./authService";
export const baseUrl = 'https://localhost:7229/api';

export const createReaction = (postId, reactionType) => {
    return fetch(`${baseUrl}/posts/reaction/${reactionType}/${postId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    }).then(res => res.json());
}