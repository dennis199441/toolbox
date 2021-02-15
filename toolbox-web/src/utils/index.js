import axios from 'axios';
import { httpGet, httpDelete } from './http';

// Private API

export const activateUser = async (username) => {
    let url = 'http://127.0.0.1:8080/user/activate/' + username;
    const data = await httpGet(url);
    return data === "activated user: " + username;
}

export const deactivateUser = async (username) => {
    let url = 'http://127.0.0.1:8080/user/deactivate/' + username;
    const data = await httpGet(url);
    return data === "deactivated user: " + username;
}

export const getCurrentUser = async () => {
    let url = 'http://127.0.0.1:8080/user/me';
    return await httpGet(url);
}

export const getUsers = async () => {
    let url = 'http://127.0.0.1:8080/user/';
    return await httpGet(url);
}

export const getUserDetails = async (username) => {
    let url = 'http://127.0.0.1:8080/user/' + username;
    return await httpGet(url);
}

export const getRoles = async () => {
    let url = 'http://127.0.0.1:8080/role/';
    return await httpGet(url);
}

export const getUserRoles = async (username) => {
    let url = 'http://127.0.0.1:8080/userrole/' + username;
    return await httpGet(url);
}

export const deleteRole = async (name) => {
    let url = 'http://127.0.0.1:8080/role/';
    let form = new FormData();
    form.append('name', name);
    return await httpDelete(url ,form);
}


// Public API

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

export const isLogin = () => {
    if (localStorage.getItem("access_token") && localStorage.getItem("refresh_token")) {
        return true;
    }

    return false;
}