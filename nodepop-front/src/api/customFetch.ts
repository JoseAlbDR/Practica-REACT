import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL;

const customFetch = axios.create({ baseURL: url });
customFetch.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.log(error.response);
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    console.log(error);
    return Promise.reject({ message: error.message });
  }
);

export const setAuthorizationHeader = (token: string) => {
  customFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () =>
  delete customFetch.defaults.headers.common['Authorization'];

export default customFetch;
