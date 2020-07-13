import React, {
   createContext,
   useCallback,
   useState,
   useContext,
   useEffect,
} from 'react';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
   const [data, setData] = useState(() => {
      const token = localStorage.getItem('@Saude:token');
      const user = localStorage.getItem('@Saude:user');

      if (token && user) {
         api.defaults.headers.authorization = `Bearer ${token}`;

         return { token, user: JSON.parse(user) };
      }

      return {};
   });

   const signIn = useCallback(async ({ email, username, password }) => {
      let signInData;

      if (email) {
         signInData = { email, password };
      } else {
         signInData = { username, password };
      }

      const response = await api.post('/sessions', signInData);

      const { token, user } = response.data;

      if (!user.imageId) {
         user.imageUrl = `https://api.adorable.io/avatars/285/${user.id}.png`;
      } else {
         user.ImageUrl = `https://i.imgur.com/${user.imageId}.${user.imageType}`;
      }

      api.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.setItem('@Saude:token', token);
      localStorage.setItem('@Saude:user', JSON.stringify(user));

      setData({ token, user });
   }, []);

   const signOut = useCallback(() => {
      localStorage.removeItem('@Saude:token');
      localStorage.removeItem('@Saude:user');
      api.defaults.headers.authorization = '';

      setData({});
   }, []);

   useEffect(() => {
      if (!data.token) {
         return;
      }

      api.get('sessions').catch(() => {
         signOut();

         alert('Sessão expirada, entre novamente.');
      });
   }, [data.token, signOut]);

   return (
      <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
         {children}
      </AuthContext.Provider>
   );
};

function useAuth() {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }

   return context;
}

export { AuthProvider, useAuth };
