import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL;

const customFetch = axios.create({ baseURL: url });
customFetch.interceptors.response.use(({ data }) => data);
export default customFetch;
