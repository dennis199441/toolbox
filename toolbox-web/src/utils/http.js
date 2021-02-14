import axios from 'axios';

const EXPIRE_MSG = "Token has expired";
const MAX_RETRY = 3;

export const httpGet = async (url) => {
  const access_token = 'Bearer ' + localStorage.getItem("access_token");
  let i = 0;
  while (i < MAX_RETRY) {
      let response = await axios({
          method: 'get',
          url: url,
          headers: { 'Authorization': access_token }
      });

      if (response.status === 401 && response.data.msg === EXPIRE_MSG) {
          await refreshToken();
          i++;
      }

      if (response.status === 200) {
          return response.data;
      }
  }

  return null;
}

export const httpPost = async (url, data) => {
  const access_token = 'Bearer ' + localStorage.getItem("access_token");
  let i = 0;
  while (i < MAX_RETRY) {
      let response = await axios({
          method: 'post',
          url: url,
          headers: { 'Authorization': access_token },
          data: data
      });

      if (response.status === 401 && response.data.msg === EXPIRE_MSG) {
          await refreshToken();
          i++;
      }

      if (response.status === 200) {
          return response.data;
      }
  }

  return null;
}

export const httpDelete = async (url, data) => {
  const access_token = 'Bearer ' + localStorage.getItem("access_token");
  let i = 0;
  while (i < MAX_RETRY) {
      let response = await axios({
          method: 'delete',
          url: url,
          headers: { 'Authorization': access_token },
          data: data
      });

      if (response.status === 401 && response.data.msg === EXPIRE_MSG) {
          await refreshToken();
          i++;
      }

      if (response.status === 200) {
          return response.data;
      }
  }

  return null;
}

const refreshToken = async () => {
  let refresh_token = "Bearer " + localStorage.getItem("refresh_token");
  let response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:8080/auth/refresh',
      headers: { 'Authorization': refresh_token }
  })
  let access_token = response.data.access_token;
  if (access_token) {
      localStorage.setItem("access_token", access_token);
  }
}