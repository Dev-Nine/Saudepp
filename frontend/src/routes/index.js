import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import {
    Home,
    ListNotices,
    NoticeDisplay,
    SignIn,
    NotFound,
    Faq,
    FaqCovid19,
    About,
    Panel,
    PanelTags,
    PanelUsers,
    CreateUser,
    PanelNotices,
    CreateNotice,
    ForgotPassword,
    ResetPassword,
    EditUser,
} from '../screens';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={SignIn} />
            <Route path="/notices" exact component={ListNotices} />
            <Route path="/about" exact component={About} />
            <Route path="/faq" exact component={Faq} />
            <Route path="/faq/covid19" exact component={FaqCovid19} />
            <Route path="/notices/:noticeId" exact component={NoticeDisplay} />
            <Route
                path="/panel/notices"
                isPrivate
                exact
                component={PanelNotices}
            />
            <Route
                path="/panel/notices/create"
                isPrivate
                exact
                component={CreateNotice}
            />
            <Route path="/panel" isPrivate exact component={Panel} />
            <Route path="/panel/tags" isPrivate exact component={PanelTags} />
            <Route path="/panel/users" isPrivate exact component={PanelUsers} />
            <Route
                path="/panel/users/create"
                isPrivate
                exact
                component={CreateUser}
            />
            <Route
                path="/panel/users/edit/:userId"
                isPrivate
                exact
                component={EditUser}
            />

            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/reset-password" exact component={ResetPassword} />

            <Route path="*" component={NotFound} />
        </Switch>
    );
}
