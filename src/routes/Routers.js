import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import PasswordForm from '../auth/form/PasswordForm';
import ResetForm from '../auth/ResetForm';
import {AuthorizedRoute, NotFoundRoute} from './Router';
import {Auth} from '../auth/Auth';
import Home from '../Home';

export default class Routers extends Component{

  render(){
    return (
      <Switch>

        <AuthorizedRoute exact permission="allow_any" path="/" component={ Home } />

        <Route exact path="/login" component={ LoginPage } />
        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <AuthorizedRoute permission="allow_any" path="/login/changepassword"
          render={ () => <PasswordForm userid={Auth.getUserId()} username={Auth.getUserName()} /> } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
