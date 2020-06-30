import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
	CreateNoticies,
	Home,
	ListNotices,
	Login,
	RegisterProfessional,
	NotFound,
	NoticeDisplay,
	Register,
	RegisterMedic,
	Faq,
	FaqCovid19
} from '../screens' 

export default function Routes() {
   return (
         <Switch>
	    <Route path="/" exact component={ Home } />
            <Route path="/login" exact component={ Login }/>
	    <Route path="/notices" exact component={ ListNotices }/>
	    <Route path="/faq" exact component={ Faq }/>
	    	<Route path="/faq/covid19" exact component={ FaqCovid19 }/>
	    <Route path="/notices/:noticeId" exact component={ NoticeDisplay }/>
	    <Route path="/painel/notices" isPrivate exact component={ CreateNoticies }/>
            <Route path="/painel/register" isPrivate exact component={ Register }/> 
            <Route path="/painel/register/professional" isPrivate exact component={ RegisterProfessional }/>
	    <Route pasth="/painel/register/medic" isPrivate exact component={ RegisterMedic }/>
	    <Route path="" component={ NotFound }/>      
	</Switch>
   )
}
