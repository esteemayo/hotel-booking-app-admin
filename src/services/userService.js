import http from './httpService';

const apiEndpoint = '/users';

const userUrl = (userId) => `${apiEndpoint}/${userId}`;

export const getUsers = () => http.get(apiEndpoint);

export const deleteUser = (userId) => http.delete(userUrl(userId));
