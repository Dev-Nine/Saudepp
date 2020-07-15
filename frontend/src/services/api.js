import axios from 'axios';
import useSWR from 'swr';

const api = axios.create({
   baseURL: 'https://saudepp.herokuapp.com',
});

export function useAxios(url, params) {
   const { data, error } = useSWR(url, async (link) => {
      const response = await api.get(link, params);

      return response.data;
   });
   return { data, error };
}

export default api;
