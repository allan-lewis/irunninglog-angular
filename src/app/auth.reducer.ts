import {Action} from '@ngrx/store';
import {AuthModel} from './auth.model';

export const LOGIN = '000261b7-0fa1-4a88-a9f1-b3ae4e60f4ce';
export const LOGOUT = 'b0924068-0487-4ffb-beb6-932261d65d0b';

export function authReducer(state: AuthModel = {authenticated: false}, action: Action) {
  switch (action.type) {
    case LOGIN:
        return Object.assign({}, state, {username: action.payload, authenticated: true});
    case LOGOUT:
        return Object.assign({}, {authenticated: false});
    default:
        return state;
  }
}
