import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import Noticies from './screens/Noticies';

export default function Routes() {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" exact component={Login}/>
            <Route path="/Noticies" exact component={Noticies}/>
         </Switch>
      </BrowserRouter>
   )
}