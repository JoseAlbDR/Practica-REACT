import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL;

const customFetch = axios.create({ baseURL: url });
customFetch.interceptors.response.use(({ data }) => data);

export const setAuthorizationHeader = (token: string) => {
  customFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () =>
  delete customFetch.defaults.headers.common['Authorization'];

export default customFetch;
