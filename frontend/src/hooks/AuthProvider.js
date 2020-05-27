import React, {createContext, useCallback, useState, useContext} from 'react'

import api from '../utils/api'

const AuthContext = createContext({})

const AuthProvider = ({children}) => {
   const [data, setData] = useState(() => {
      const token = localStorage.getItem('@Saude:token');
      const user = localStorage.getItem('@Saude:user')

      if (token && user) {
         return {token, user: JSON.parse(user)};
      }

      return {}
   })

   const signIn = useCallback(async ({email, password}) => {
      const response = await api.post('/sessions', {
         email,
         password
      });

      const {token, user} = response.data;

      localStorage.setItem('@Saude:token', token);
      localStorage.setItem('@Saude:user', JSON.stringify(user));

       setData({token, user})
      console.log(token, user)
   }, [])

   const signOut = useCallback(() => {
      localStorage.removeItem('@Saude:token');
      localStorage.removeItem('@Saude:user');

      setData({})
   }, [])

   return (
      <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
         {children}
      </AuthContext.Provider>
   );
};

function useAuth() {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider')
   }

   return context
}

export {AuthProvider, useAuth};