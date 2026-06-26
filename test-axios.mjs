import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8000/api' });
console.log(instance.getUri({ url: '/auth/login' }));
