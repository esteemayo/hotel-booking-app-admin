import http from './httpService';

const apiEndpoint = '/hotels';

const hotelUrl = (hotelId) => `${apiEndpoint}/${hotelId}`;

export const getHotels = () => http.get(apiEndpoint);

export const deleteHotel = (hotelId) =>
  http.delete(hotelUrl(hotelId));
