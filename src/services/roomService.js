import http from './httpService';

const apiEndpoint = '/rooms';

const roomUrl = (roomId) => `${apiEndpoint}/${roomId}`;

export const getRooms = () => http.get(apiEndpoint);

export const getRoom = (roomId) => http.get(roomUrl(roomId));

export const createRoom = (room) => http.post(apiEndpoint, room);

export const deleteRoom = (roomId) => http.delete(roomUrl(roomId));
