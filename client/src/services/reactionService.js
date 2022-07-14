import { getToken } from "./authService";
export const baseUrl = 'https://localhost:7229/api';

export const createReaction = (id, collection, reactionType) => {
    return fetch(`${baseUrl}/${collection}/reaction/${reactionType}/${id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    }).then(res => res.json());
}