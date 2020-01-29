import localforage from 'localforage';
import Http from '../Http';

const INTENDED_URL = 'intended_url';
const DEFAULT_INTENDED_URL = '/home';

const setLocalForageToken = token => {
  if (!token) {
      localStorage.removeItem('token', token);
  }

    localStorage.setItem('token', token);
};

const setHttpToken = (token) => {
  if (!token) {
    Http.defaults.headers.common['Authorization'] = null;
  }

  Http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export const checkTokenExists = () => {
  return localforage.getItem('jwt_token').then((token) => {
    if (!token) {
      return Promise.reject();
    }

    return Promise.resolve(token);
  });
};

export const setToken = token => {
  setLocalForageToken(token);
  setHttpToken(token);
};

export const setIntendedUrl = url => {
  localforage.setItem(INTENDED_URL, url);
};

export const getIntendedUrl = () => {
  return localforage.getItem(INTENDED_URL).then((url) => {
    if (!url) {
      url = DEFAULT_INTENDED_URL;
    }

    return Promise.resolve(url);
  });
};
