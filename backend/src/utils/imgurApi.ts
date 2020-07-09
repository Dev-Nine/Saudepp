import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.imgur.com/3/',
});

export const url = "https://i.imgur.com/";