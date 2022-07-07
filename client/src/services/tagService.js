export const baseUrl = 'https://localhost:7229/api';

export const getAllTags = async () => {
    var res = await fetch(`${baseUrl}/tags`);
    let data = await res.json();
    return data;
}