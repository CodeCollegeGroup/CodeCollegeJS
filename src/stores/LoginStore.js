'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';

class LoginStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {userExist: true}; }

  reduce = (state, action) => {
    switch (action.action) {
    case ActionType.LOGIN.POST:
      postData('http://localhost:8000/api/users/authenticate/',
        action.data,
        (data) => {
          AppDispatcher.dispatch({action: ActionType.LOGIN.SUCCESS,
            data: data});
        },
        () => {
          AppDispatcher.dispatch({action: ActionType.LOGIN.FAIL});
        }
      );
      return state;

    case ActionType.LOGIN.FAIL:
      return {userExist: false, auth: false};

    case ActionType.LOGOUT:
      Auth.deauthenticate();
      return {...state, auth: false};

    case ActionType.REFRESH_LOGIN:
      postData('http://localhost:8000/api/users/refresh/',
        action.data,
        (data) => {
          AppDispatcher.dispatch({action: ActionType.LOGIN.SUCCESS,
            data: data});
        },
        () => {
          alert('Fail when try refresh token\nLogouting');
          AppDispatcher.dispatch({action: ActionType.LOGOUT});
        }
      );
      return state;

    case ActionType.LOGIN.SUCCESS:
      Auth.authenticate(action.data);
      return {...state, userExist: true, auth: true};

    default:
      return state;
    }
  }
}

export default new LoginStore();
