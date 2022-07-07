export const baseUrl = 'https://localhost:7229/api';

export const getAllCategories = () => {
    return fetch(`${baseUrl}/categories`)
        .then(res => res.json());
}