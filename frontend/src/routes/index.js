import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import Route from './Route'
import Home from '../screens/Home';
import Login from '../screens/Login';
import Noticies from '../screens/Noticies';
import Register from '../screens/register';
import RegisterProfessional from '../screens/RegisterProfessional';
import RegisterMedic from '../screens/RegisterMedic';
import NoticeDisplay from '../screens/NoticeDisplay'; 


export default function Routes() {
   return (
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login}/>
            <Route path="/noticies" exact component={Noticies}/>
            <Route path="/notices/:noticeId" exact component={NoticeDisplay}/>
            <Route path="/register" exact component={Register}/> 
            <Route path="/register/professional" isPrivate exact component={RegisterProfessional}/>
            <Route pasth="/register/medic" exact component={RegisterMedic}/>
         </Switch>
   )
}
