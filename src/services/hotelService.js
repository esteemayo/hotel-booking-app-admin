import http from './httpService';

const apiEndpoint = '/hotels';

const hotelUrl = (hotelId) => `${apiEndpoint}/${hotelId}`;

export const getHotels = () => http.get(apiEndpoint);

export const getHotel = (hotelId) => http.get(hotelUrl(hotelId));

export const deleteHotel = (hotelId) =>
  http.delete(hotelUrl(hotelId));
