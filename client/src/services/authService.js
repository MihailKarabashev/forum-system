const baseUrl = 'https://localhost:7229/api';


export const login = async (email, password) => {
    let result = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    let jsonResult = await result.json();

    if (result.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}


export const register = (username, email, password) => {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
    })
        .then(res => res.json());
}


export function getToken() {
    try {
        let userItem = localStorage.getItem('user');

        if (!userItem) {
            console.log('error');
            throw { message: 'You must be authenticated', statusCode: 403 };
        }

        let user = JSON.parse(userItem);

        return user.token;
    } catch (err) {
        console.log(err);
    }
}