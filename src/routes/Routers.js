import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import ResetForm from '../auth/ResetForm';
import RegistrationForm from '../auth/form/RegistrationForm';
import {AuthorizedRoute, NotFoundRoute} from './Router';
import {Auth} from '../auth/Auth';
import Home from '../Home';

export default class Routers extends Component{

  render(){
    return (
      <Switch>

        <Route exact path="/" component={ Home } />

        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/register" component={ RegistrationForm } />
        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
