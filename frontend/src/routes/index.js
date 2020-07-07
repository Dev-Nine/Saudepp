import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import {
   CreateNoticies,
   Home,
   ListNotices,
   SignIn,
   RegisterProfessional,
   NotFound,
   NoticeDisplay,
   RegisterMedic,
   Faq,
   FaqCovid19,
   About,
   Register,
} from '../screens';

export default function Routes() {
   return (
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/signin" exact component={SignIn} />
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
         <Route path="/panel/register" isPrivate exact component={Register} />
         <Route
            path="/panel/register/professional"
            isPrivate
            exact
            component={RegisterProfessional}
         />
         <Route
            path="/panel/register/medic"
            exact
            isPrivate
            component={RegisterMedic}
         />
         <Route path="*" component={NotFound} />
      </Switch>
   );
}
