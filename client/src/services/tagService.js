export const baseUrl = 'https://localhost:7229/api';


export const getAllTags = () => {
    return fetch(`${baseUrl}/tags`)
        .then(res => res.json());
}