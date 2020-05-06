import React from 'react';
import {useAuth} from '../hooks/auth'

import { Redirect, Route as ReactDOMRoute  } from 'react-router-dom'

const Route = ({isPrivate = false, component: Component, ...rest}) => {
   const {user} = useAuth();

   return (
      <ReactDOMRoute {...rest} render={({location}) => {
         return isPrivate === !!user ? (
            <Component />
         ) : (
            <Redirect to={{
               pathname: isPrivate ? '/login' : '/',
               state: {from: location},
         }}
         />
         )
      }} ></ReactDOMRoute>
   )
}

export default Route