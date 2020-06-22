import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import Route from './Route'
import Home from '../screens/Home';
import Login from '../screens/Login';
import CreateNoticies from '../screens/Noticies';
import Register from '../screens/Register';
import RegisterProfessional from '../screens/RegisterProfessional';
import RegisterMedic from '../screens/RegisterMedic';
import NoticeDisplay from '../screens/NoticeDisplay'; 
import NotFound from '../screens/NotFound';

export default function Routes() {
   return (
         <Switch>
	    <Route path="/" exact component={ Home } />
            <Route path="/login" exact component={ Login }/>
	    <Route path="/notices/:noticeId" exact component={ NoticeDisplay }/>
	    <Route path="/painel/notices" exact component={ CreateNoticies }/>
            <Route path="/painel/register" exact component={ Register }/> 
            <Route path="/painel/register/professional" isPrivate exact component={ RegisterProfessional }/>
	    <Route pasth="/painel/register/medic" exact component={ RegisterMedic }/>
	    <Route path="" component={ NotFound }/>      
	</Switch>
   )
}
