import axios from 'axios';
import useSWR from 'swr';

const config = {
    baseURL: 'https://saudepp.herokuapp.com',
};

const api = axios.create(config);

export function useAxios(url, requestConfig) {
    const { data, error, mutate } = useSWR(
        [url, requestConfig],
        async (route, reqConf) => {
            const response = await api.get(route, reqConf);

            return response.data;
        },
    );
    return { data, error, mutate };
}

export default api;
