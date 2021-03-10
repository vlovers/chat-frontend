import React from 'react';
import {Route} from 'react-router-dom'

import {RegisterForm, LoginFormContainer} from '../components';
import CheckEmailInfo from './checkEmailInfo';


const Auth = () => {
    return (
        <div>
            <Route exact path="/signin" component={LoginFormContainer} />
            <Route exact path="/signup" component={RegisterForm} />
            <Route exact path="/verify" component={CheckEmailInfo} />

        </div>
    );
};

export default Auth;