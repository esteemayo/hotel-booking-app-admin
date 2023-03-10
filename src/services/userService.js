import http from './httpService';

const apiEndpoint = '/users';

const userUrl = (userId) => `${apiEndpoint}/${userId}`;

export const getUsers = () => http.get(apiEndpoint);

export const getUser = (userId) => http.get(userUrl(userId));

export const getUserStats = () => http.get(`${apiEndpoint}/stats`);

export const createUser = (credentials) =>
  http.post(`${apiEndpoint}/register`, credentials);

export const updateUser = (userId, userData) =>
  http.patch(`${apiEndpoint}/${userId}`, userData);

export const deleteUser = (userId) => http.delete(userUrl(userId));
