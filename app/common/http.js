import axios from 'axios';
import { BASE_URL } from '../config/commonVar';
import qs from 'qs';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  //   baseURL: BASE_URL,
  timeout: 10 * 1000, //timeout: 10s
});

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    APIKit.get(`${BASE_URL}${url}`, { params })
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          if (error.response?.status === 401) {
            //   message.error('登录已过期,请重新登录...');
            //   setTimeout(() => {
            //     window.location.href = '/login';
            //   }, 1000);
            //   return;
          }
          reject(error);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
};

export const post = (url, data = {}, isCDN = false) => {
  return new Promise((resolve, reject) => {
    APIKit.post(`${isCDN ? url : BASE_URL + url}`, qs.stringify({ ...data }))
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          //   console.log(error.response.body);
          if (error.response?.status === 401) {
            //   message.error('登录已过期,请重新登录...');
            //   setTimeout(() => {
            //     window.location.href = '/login';
            //   }, 1000);
            //   return;
          }
          console.log(error);
          reject(error);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
};

// export default APIKit;
