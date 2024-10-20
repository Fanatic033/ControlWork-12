import axios from 'axios';
import { API_URL } from './constants';
import { Store } from '@reduxjs/toolkit';
import { RootState } from './src/app/store';

const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((request) => {
    const token = store.getState().users.user?.token;
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  });
};

export default axiosApi;
