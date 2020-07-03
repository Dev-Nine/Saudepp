import React from 'react';
import { Redirect, Route as ReactDOMRoute } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
   const { user } = useAuth();

   return (
      <ReactDOMRoute
         render={({ location }) => {
            return isPrivate === !!user ? (
               <Component {...rest} />
            ) : (
               <Redirect
                  to={{
                     pathname: isPrivate ? '/login' : '/',
                     state: { from: location },
                  }}
               />
            );
         }}
      />
   );
};

export default Route;
