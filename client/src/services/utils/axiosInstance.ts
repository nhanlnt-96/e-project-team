import axios from 'axios';
import { LocalStorageName } from 'constants/index';
import { removeLocalStorageItem } from 'utils/localStorage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access = window.localStorage.getItem(LocalStorageName.ACCESS_TOKEN_NAME);
    if (access) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.headers.Authorization = `Bearer ${JSON.parse(access)}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201 || response?.data) {
      return response.data;
    }
  },
  (error) => {
    if (error.response.status === 401) removeLocalStorageItem(LocalStorageName.ACCESS_TOKEN_NAME);

    return Promise.reject(error.response.data.message || error.message);
  }
);

export default axiosInstance;
