import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL;

const customFetch = axios.create({ baseURL: url });
customFetch.interceptors.response.use(({ data }) => data);
customFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customFetch;
