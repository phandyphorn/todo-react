const axios = require('axios');
const instance = axios.create({ baseURL: 'http://localhost:8000/api' });
console.log(instance.getUri({ url: '/auth/login' }));
console.log(instance.getUri({ url: 'todos' }));
console.log(instance.getUri({ url: '/todos' }));
