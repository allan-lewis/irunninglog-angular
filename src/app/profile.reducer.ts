import { Action } from '@ngrx/store';
import { ProfileModel } from './profile.model';

export const PROFILE_SET = '293b547b-0148-4e0f-9f83-e0f604bdc954';

export function profileReducer(state: ProfileModel = {id: 0, username: '', firstName: '', lastName: ''}, action: Action) {
  switch (action.type) {
    case PROFILE_SET:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
