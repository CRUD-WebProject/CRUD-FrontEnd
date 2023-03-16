import axios from 'axios';
import { refresh, refreshErrorHandle } from './refresh';

const api = axios.create({
    timeout: 10000,
    params: {},
});

api.interceptors.request.use(refresh, refreshErrorHandle);

export default api;