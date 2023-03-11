import axios from 'axios';
import instance from './custom-axios';
import bearerAuth from '../utils/BearerAuth';
import { config } from '../constants/systemConstants';

export const saveUserDetailsMe = (token, userExtra) => instance.post(`${config.url.API_USER_URL}/users/me`, userExtra, {
  // headers: { Authorization: bearerAuth(token) },
});

export const getUserByEmail = (email, token) => axios.get(`${config.url.API_USER_URL}/users/${email}`, {
  // headers: { Authorization: bearerAuth(token) },
});

export const createUser = (user) => instance.post(`${config.url.API_USER_URL}/users`, user, {
  // headers: { Authorization: bearerAuth(token) },
});

export const imageUpload = (formData, token) => axios.post(`${config.url.API_USER_URL}/users/imageUpload`, formData, {
  headers: { 
    'Content-Type': 'multipart/form-data',
    Authorization: bearerAuth(token),
  },
});

export const updateUser = (token, formData) => instance.put(`${config.url.API_USER_URL}/users`, formData, {
  headers: { 
    'Content-Type': ['filepart/form-data', 'application/json'],
    // Authorization: bearerAuth(token),
  },
});
