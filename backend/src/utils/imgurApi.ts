import axios from 'axios';
require('dotenv').config();

export default axios.create({
    baseURL: 'https://api.imgur.com/3/',

});

export const config = {
    headers: {
        Authorization: `Client-ID ${process.env.IMGUR_ID}`
    }
}

export const url = "https://i.imgur.com/";
