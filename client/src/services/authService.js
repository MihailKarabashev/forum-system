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

export const register = async (email, password) => {
    let result = await fetch(`${baseUrl}/register`, {
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




function getToken() {
    try {
        let userItem = localStorage.getItem('user');

        if (!userItem) {
            throw { message: 'You must be authenticated', statusCode: 403 };
        }

        let user = JSON.parse(userItem);

        return user.accessToken;
    } catch (err) {
        console.log(err);
    }
}