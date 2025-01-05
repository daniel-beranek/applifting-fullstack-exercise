import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: `https://${process.env.API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.API_KEY,
  },
});

// TODO: error handling
instance.interceptors.request.use(
  (config) => {
    const isProtectedMethod = /(post|put|patch|delete)/i.test(config.method ?? '');

    // TODO: Replace after authentication is implemented
    if (isProtectedMethod) config.headers.Authorization = `Bearer ${process.env.ACCESS_TOKEN}`;

    const isMissingEnvLoadedValue = !config.baseURL || !config.headers['X-API-KEY'];
    if (isMissingEnvLoadedValue) {
      return Promise.reject(
        new Error(
          'Missing env loaded values, make sure you use this instance on server side only (client does not have access to these env variables)'
        )
      );
    }

    return config;
  },
  (error: unknown) => {
    // Handle request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: unknown) => {
    // if (error.response && error.response.status === 401) {
    // Handle unauthorized error (e.g., redirect to login)
    // ...
    // }
    return Promise.reject(error);
  }
);

export default instance;
