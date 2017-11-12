import { Action } from '@ngrx/store';
import { ProfileModel } from './profile.model';
import * as Immutable from 'immutable';

export const PROFILE_SET = '293b547b-0148-4e0f-9f83-e0f604bdc954';

export function profileModelReducer(state: ProfileModel = {id: 0, username: '', firstName: '', lastName: ''}, action: Action) {
  switch (action.type) {
    case PROFILE_SET: 
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
