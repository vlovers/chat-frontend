import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Reset } from 'styled-reset';
import {userActions} from '../../redux/actions';
import store from "../../redux/store";

import {Home, Auth, CheckEmailInfo} from '../../pages';

import './app.css'
const App = ({ isAuth }) => {
    useEffect(() => {

    }, []);
    store.dispatch(userActions.fetchUserData())
        
    

    return (
        <div>
            <Reset />
            <Route exect path={["/", "/singin", "singup", '/verify']} component={Auth}/>
            <Route
                exact
                path="/"
                render={() =>
                console.log(isAuth) || isAuth ? <Home /> : <Redirect to="/singin" />
                }
            />

        </div>
    );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);