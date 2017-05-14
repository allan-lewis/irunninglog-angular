import { Action } from '@ngrx/store';
import { AuthModel, AuthState } from './auth.model';

export const LOGIN = '000261b7-0fa1-4a88-a9f1-b3ae4e60f4ce';
export const LOGOUT = 'b0924068-0487-4ffb-beb6-932261d65d0b';
export const UNAUTHENTICATED = '4d9aee05-b13b-49bb-bc92-581a3f1c87e6';

export function authReducer(state: AuthModel = {authenticated: AuthState.Unknown}, action: Action) {
  switch (action.type) {
    case LOGIN:
        return Object.assign({}, state, {id: action.payload.id, token: action.payload.token, authenticated: AuthState.Authenticated});
    case LOGOUT:
        return Object.assign({}, {authenticated: AuthState.Unauthenticated});
    case UNAUTHENTICATED:
        return Object.assign({}, {authenticated: AuthState.Unauthenticated});
    default:
        return state;
  }
}
