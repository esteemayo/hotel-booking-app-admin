import http from './httpService';

const apiEndpoint = '/users';

export const getUsers = () => http.get(apiEndpoint);
