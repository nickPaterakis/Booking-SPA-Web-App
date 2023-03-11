export const MAX_GUEST_NUMBER = 16;
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT_1 = 'YYYY/MM/DD';
export const PER_PAGE = 5;

const prod = {
  url: {
    KEYCLOAK_BASE_URL: 'http://keycloak:8080',
    API_PROPERTY_URL: 'http://localhost:8000/property-service/api/v1',
    API_RESERVATION_URL: 'http://localhost:8000/reservation-service/api/v1',
    API_USER_URL: 'http://localhost:8000/user-service/api/v1',
    PROPERTY_IMAGES_URL: 'https://storage.googleapis.com/booking-ms/',
    USER_IMAGES_URL: 'https://storage.googleapis.com/booking-ms/',
  },
  KEYCLOAK_CLIENT_ID: 'client-service-client',
};

const dev = {
  url: {
    KEYCLOAK_BASE_URL: 'http://localhost:8080',
    API_PROPERTY_URL: 'http://localhost:8088/api/v1',
    API_RESERVATION_URL: 'http://localhost:8085/api/v1',
    API_USER_URL: 'http://localhost:8082/api/v1',
    // API_PROPERTY_URL: 'http://localhost:8000/property-service/api/v1',
    // API_RESERVATION_URL: 'http://localhost:8000/reservation-service/api/v1',
    // API_USER_URL: 'http://localhost:8000/user-service/api/v1',
    PROPERTY_IMAGES_URL: 'https://storage.googleapis.com/booking-ms/',
    USER_IMAGES_URL: 'https://storage.googleapis.com/booking-ms/',
  },
  KEYCLOAK_CLIENT_ID: 'client-service-client',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
