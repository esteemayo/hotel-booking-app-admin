export const tokenKey = 'access_token';

export const darkModeKey = 'darkMode';

export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setToStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const clearFromStorage = () => {
  return localStorage.clear();
};

export const excerpts = (str, count) => {
  if (str.length > count) {
    str = `${str.split(' ').splice(0, count).join(' ')} ...`;
  }
  return str;
};
