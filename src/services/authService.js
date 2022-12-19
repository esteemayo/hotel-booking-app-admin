import http from './httpService';
import { getFromStorage, tokenKey } from 'utils/index';

const apiEndpoint = '/auth';

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const getJwt = () => getFromStorage(tokenKey)?.token;
