import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201 || response?.data) {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error.response.data.message || error.message);
  }
);

export default axiosInstance;
