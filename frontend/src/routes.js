import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import Noticies from './screens/Noticies';
import Register from './screens/register';
import RegisterProfessional from './screens/RegisterProfessional'
import RegisterMedic from './screens/RegisterMedic';


export default function Routes() {
   return (
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login}/>
            <Route path="/noticies" exact component={Noticies}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/register/professional" exact component={RegisterProfessional}/>
            <Route pasth="/register/medic" exact component={RegisterMedic}/>
         </Switch>
   )
}
