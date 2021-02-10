import axios from 'axios';

export const getRoles = async () => {
    const access_token = 'Bearer ' + localStorage.getItem("access_token");
    let response = await axios({
        method: 'get',
        url: 'http://127.0.0.1:8080/role/',
        headers: { 'Authorization': access_token }
    });
    return response.data;
}

export const signUp = async (username, email, password) => {
    let form = new FormData();
    form.append('username', username);
    form.append('email', email);
    form.append('password', password);

    await axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/',
        data: form
    });
}

export const login = async (username, password) => {
    let form = new FormData();
    form.append('username', username);
    form.append('password', password);

    let response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/auth/login',
        data: form
    });

    let access_token = response.data.access_token;
    let refresh_token = response.data.refresh_token;
    if (access_token && refresh_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
    }
}

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
}

/**
 * TODO: verify access_token and refresh_token
 */
export const isLogin = () => {
    if (localStorage.getItem("access_token") && localStorage.getItem("refresh_token")) {
        return true;
    }

    return false;
}