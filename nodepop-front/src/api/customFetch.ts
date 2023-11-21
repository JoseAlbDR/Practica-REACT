import axios, { AxiosError } from 'axios';

export class CustomAxiosError extends AxiosError {
  constructor(public status: number, public message: string) {
    super();
  }
}

const url = import.meta.env.VITE_BASE_URL;

const customFetch = axios.create({ baseURL: url });
customFetch.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    if (error.response) {
      const customError = new CustomAxiosError(
        error.response.status,
        error.response.statusText || 'Unknown error'
      );
      return Promise.reject(customError);
    }
    return Promise.reject(error);
  }
);

export const setAuthorizationHeader = (token: string) => {
  customFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () =>
  delete customFetch.defaults.headers.common['Authorization'];

export default customFetch;
