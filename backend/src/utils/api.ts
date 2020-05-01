import axios from 'axios';

export default axios.create({
    baseURL: 'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/',
    headers: {
        'x-parse-application-id':'unAFkcaNDeXajurGB7LChj8SgQYS2ptm'
    }
});