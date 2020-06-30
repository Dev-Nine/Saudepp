import React from 'react';
import { Redirect, Route as ReactDOMRoute } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
   const { user } = useAuth();

   return (
      <ReactDOMRoute
         {...rest}
         render={({ location }) => {
            return isPrivate === !!user ? (
               <Component />
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
