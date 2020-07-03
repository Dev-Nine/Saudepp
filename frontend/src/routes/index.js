import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

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
   FaqCovid19,
   About,
} from '../screens';

export default function Routes() {
   return (
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/login" exact component={Login} />
         <Route path="/notices" exact component={ListNotices} />
         <Route path="/about" exact component={About} />
         <Route path="/faq" exact component={Faq} />
         <Route path="/faq/covid19" exact component={FaqCovid19} />
         <Route path="/notices/:noticeId" exact component={NoticeDisplay} />
         <Route
            path="/painel/notices"
            isPrivate
            exact
            component={CreateNoticies}
         />
         <Route path="/painel/register" isPrivate exact component={Register} />
         <Route
            path="/painel/register/professional"
            isPrivate
            exact
            component={RegisterProfessional}
         />
         <Route
            path="/painel/register/medic"
            exact
            isPrivate
            component={RegisterMedic}
         />
         <Route path="*" component={NotFound} />
      </Switch>
   );
}
