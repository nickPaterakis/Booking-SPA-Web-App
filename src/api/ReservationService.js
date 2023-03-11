import axios from 'axios';
import bearerAuth from '../utils/BearerAuth';
import { config } from '../constants/systemConstants';

export const createReservation = (reservation, token) => axios.post(`${config.url.API_RESERVATION_URL}/reservations`, reservation, {
  headers: { Authorization: bearerAuth(token) },
});

// export const getReservationsByUserId = (token) =>
// axios.get(`${config.url.API_RESERVATION_URL}/reservations/my-reservations`, {
//   headers: { Authorization: bearerAuth(token) },
// });

export const getReservationsByRenterId = (id) => axios.get(`${config.url.API_RESERVATION_URL}/reservations/renter/${id}`);

export const deleteReservationById = (token, reservationId) => axios.delete(`${config.url.API_RESERVATION_URL}/reservations/delete/${reservationId}`, {
  headers: { Authorization: bearerAuth(token) },
});
