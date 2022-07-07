export const baseUrl = 'https://localhost:7229/api';

export const getAllCategories = async () => {
    let res = await fetch(`${baseUrl}/categories`);

    let data = await res.json();
    return data;
}