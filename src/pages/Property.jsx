import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { SERVICE_FEE } from '../constants/reservationConstants';
import PropertySlider from '../components/PropertyComponents/PropertySlider';
import { getProperty } from '../api/PropertyService';
import Spinner from '../components/UI/Spinner';
import SummaryCard from '../components/UI/SummaryCard';
import { createReservation } from '../api/ReservationService';
import noImageProfile from '../assets/images/no-image-profile.png';
import { config } from '../constants/systemConstants';

function Property({ type, history }) {
  const { id } = useParams();
  const [property, setProperty] = useState();
  const { keycloak } = useKeycloak();
  const dates = useSelector((state) => state.searchParameters.dates);
  const guests = useSelector((state) => state.searchParameters.guests);
  const user = useSelector((state) => state.user);
  let reservationPrice = 0;

  const handleReservation = async () => {
    if (!keycloak.authenticated) {
      keycloak.login();
    } else {
      const reservation = {
        checkIn: dates.startDate,
        checkOut: dates.endDate,
        totalPrice: { amount: reservationPrice + SERVICE_FEE },
        property: {
          id: property.id,
          title: property.title,
          propertyType: property.propertyType,
          pricePerNight: { amount: property.pricePerNight },
          country: property.address.country,
          location: `${property.address.streetName} ${property.address.streetNumber}, ${property.address.city}, ${property.address.country}`,
        },
        renter: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
        owner: {
          id: property.owner.id,
          firstName: property.owner.firstName,
          lastName: property.owner.lastName,
          email: property.owner.email,
          phone: property.owner.phone,
        },
      };
      console.log(reservation);
      await createReservation(reservation, keycloak.token);
      history.push('/reservation');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProperty(id);
      setProperty(response.data);
    };
    fetchData();
  }, []);

  if (!property || !dates) {
    return <Spinner />;
  }

  const days = moment(dates.endDate).diff(dates.startDate, 'days');
  reservationPrice = days * property.pricePerNight;

  console.log(property);
  console.log(config.url.USER_IMAGES_URL + property.ownerImage);
  return (
    <main className="property">
      <header className="property-header">
        <h1 className="property-header__title">
          {property.title}
        </h1>
        <div className="property-header__location">
          {`${property.address.city}, ${property.address.country}`}
        </div>
      </header>

      <section className="property-slider">
        <PropertySlider images={property.images} />
      </section>

      <section className="property-information">
        <div className="property-information__left-column">
          <div className="property-overview padding-bottom-small">
            <div className="property-overview__left-column">
              <div className="property-overview__host-name">
                {`${property.propertyType} hosted by ${property.owner.firstName} ${property.owner.lastName}`}
              </div>
              <div className="property-overview__characteristics">
                {`${property.maxGuestNumber} guests · ${property.bedroomNumber} bedrooms · ${property.bathNumber} bath`}
              </div>
            </div>
            <div className="property-overview__right-column">
              <div className="property-overview__host-image">
                <img src={property.owner.image ? config.url.USER_IMAGES_URL + property.owner.image : noImageProfile} alt="profile" />
              </div>
            </div>
          </div>
          <div className="property-description margin-top-small padding-bottom-small">
            <h1 className="property-description__title margin-bottom-extra-small">Overview</h1>
            <p className="property-description__text">
              {property.description}
            </p>
          </div>
          <div className="property-location margin-top-small padding-bottom-small">
            <h1 className="property-location__title margin-bottom-extra-small">Location</h1>
            <div className="property-location__text">
              {`${property.address.streetName} ${property.address.streetNumber}, ${property.address.city}, ${property.address.country}`}
            </div>
          </div>
          <div className="property-amenities margin-top-small padding-bottom-small">
            <h1 className="property-amenities__title margin-bottom-extra-small">Amenities</h1>
            <ul className="property-amenities__amenities">
              {property.amenities.map((amenity) => (
                <li className="property-amenities__amenity" key={amenity.id}>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="property-information__right-column">
          {
            type === 'reserve'
              ? (
                <SummaryCard
                  pricePerNight={property.pricePerNight}
                  handleReservation={handleReservation}
                  checkIn={dates.startDate}
                  checkOut={dates.endDate}
                  guests={guests}
                />
              ) 
              : null
          }
         
        </div>
      </section>

    </main>
  );
}

Property.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  type: PropTypes.string.isRequired,
};

export default withRouter(Property);
