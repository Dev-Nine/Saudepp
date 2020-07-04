import axios from 'axios';

const api = axios.create({
   baseURL: 'https://saudepp.herokuapp.com',
});

export default api;
