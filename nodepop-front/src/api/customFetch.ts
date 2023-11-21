import axios, { AxiosError } from 'axios';

export class CustomAxiosError extends AxiosError {
  constructor(public message: string, public status?: number) {
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
        error.response.statusText || 'Unknown error',
        error.response.status
      );
      return Promise.reject(customError);
    } else if (error.message) {
      const customError = new CustomAxiosError(error.message);
      return Promise.reject(customError);
    }
    return Promise.reject(
      new CustomAxiosError('Uknown error: ' + error.message)
    );
  }
);

export const setAuthorizationHeader = (token: string) => {
  customFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () =>
  delete customFetch.defaults.headers.common['Authorization'];

export default customFetch;
