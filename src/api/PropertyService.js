import axios from 'axios';
import instance from './custom-axios';
import bearerAuth from '../utils/BearerAuth';
import { config } from '../constants/systemConstants';

export function searchProperties(location, startDate, endDate, guests, currentPage) {
  return axios.get(
    `${config.url.API_PROPERTY_URL}/properties/search?country=${ 
      location 
    }&checkIn=${ 
      startDate
    }&checkOut=${ 
      endDate
    }&guestNumber=${  
      guests
    }&currentPage=${  
      currentPage}`,
  );
}

export const getProperty = (propertyId) => axios.get(`${config.url.API_PROPERTY_URL}/properties/${propertyId}`);

export const createListing = (formData, token) => axios.post(`${config.url.API_PROPERTY_URL}/properties/`, formData, {
  headers: { 
    'Content-Type': ['multipart/form-data', 'application/json'],
    // Authorization: bearerAuth(token),
  },
});

export const deleteListing = (propertyId, token) => axios.delete(`${config.url.API_PROPERTY_URL}/properties/${propertyId}`, {
  headers: { 
    // Authorization: bearerAuth(token),
  },
});

export const getUserProperties = (ownerEmail, token) => instance.get(`${config.url.API_PROPERTY_URL}/properties/owner/${ownerEmail}`, {
  // headers: { Authorization: bearerAuth(token) },
});
