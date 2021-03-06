import { getToken } from "./authService";
export const baseUrl = 'https://localhost:7229/api';

export const getPosts = () => {
    return fetch(`${baseUrl}/posts`)
        .then(res => res.json());
}

export const getPostById = (id) => {
    return fetch(`${baseUrl}/posts/${id}`)
        .then(res => res.json());
}

export const createPost = (data) => {
    return fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export const remove = (id) => {
    return fetch(`${baseUrl}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }).then();
}

export const searchForPosts = (title) => {
    return fetch(`${baseUrl}/posts/search/${title}`)
        .then(res => res.json());
}

export const update = (data, id) => {
    return fetch(`${baseUrl}/posts/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    }).then();
}
