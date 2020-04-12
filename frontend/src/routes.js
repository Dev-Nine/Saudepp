import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';

export default function Routes() {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" exact component={Login}/>
         </Switch>
      </BrowserRouter>
   )
}