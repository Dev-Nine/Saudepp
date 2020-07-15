import React from 'react';
import { Redirect, Route as ReactDOMRoute } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
   const { user } = useAuth();
   window.scrollTo(0, 0);
   return (
      <ReactDOMRoute
         render={({ location }) => {
            return !isPrivate || isPrivate === !!user ? (
               <Component {...rest} />
            ) : (
               <Redirect
                  to={{
                     pathname: isPrivate ? '/signin' : '/',
                     state: { from: location },
                  }}
               />
            );
         }}
      />
   );
};

export default Route;
