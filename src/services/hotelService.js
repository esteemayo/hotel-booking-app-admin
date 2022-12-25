import http from './httpService';

const apiEndpoint = '/hotels';

const hotelUrl = (hotelId) => `${apiEndpoint}/${hotelId}`;

export const getHotels = () => http.get(apiEndpoint);

export const getHotel = (hotelId) => http.get(hotelUrl(hotelId));

export const getHotelBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createHotel = (hotel) => http.post(apiEndpoint, hotel);

export const updateHotel = (hotelId, hotel) =>
  http.patch(hotelUrl(hotelId), hotel);

export const deleteHotel = (hotelId) =>
  http.delete(hotelUrl(hotelId));
