import { useKeycloak } from '@react-keycloak/web';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getReservationsByRenterId } from '../api/ReservationService';
import ReservationCard from '../components/UI/ReservationCard';
import Spinner from '../components/UI/Spinner';
import reservationIcon from '../assets/icons/online-booking.svg';

function Reservations() {
  const { keycloak } = useKeycloak();
  const [reservations, setReservations] = useState();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      console.log(user.id);
      const response = await getReservationsByRenterId(user.id);
      setReservations(response.data);
    };
    if (user) {
      console.log(user);
      fetchData();
    }
  }, [user]);

  if (!reservations) {
    return <Spinner />;
  }
  console.log(reservations);
  return (
    <div className="my-reservations">
      {Array.isArray(reservations) && reservations.length
        ? (
          <div className="my-reservations__container">
            <div className="my-reservations__title">
              My Reservations
            </div>
            <div className="my-reservations__reservation-list">
              {reservations
                .map((element) => <ReservationCard key={element.id} reservation={element} />)}
            </div>
          </div>
        )
        : (
          <div className="my-reservations__empty-container">
            <img className="my-reservations__reservation-icon" src={reservationIcon} alt="Reservation Icon" />
            <div className="my-reservations__empty-title">Your trips live here</div>
            <p className="my-reservations__empty-text">
              This page shows all of your bookings.
            </p>
          </div>
        )}
    </div>
  );
}

export default Reservations;
