import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import ActionType from '../actions/ActionType';


class UserRegistrationStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {userCreated: false}; }

  reduce = (state, action) => {
    switch (action.action) {
      case ActionType.REGISTER.POST:
        postData('',
          action.data,
          (data) => {
            AppDispatcher.dispatch({action: ActionType.REGISTER.SUCCESS,
              data: data});
          },
          () => {
            AppDispatcher.dispatch({action: ActionType.REGISTER.FAIL});
          }
        );
        return state;

      case ActionType.REGISTER.SUCCESS:
        return {userCreated: true};

      case ActionType.REGISTER.FAIL:
        return {userCreated: false};
    }
  }
}

export default new UserRegistrationStore();
