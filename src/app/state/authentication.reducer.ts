import { Action } from '@ngrx/store';
import { AuthenticationModel, AuthenticationState } from './authentication.model';

export const AUTHENTICATE = '000261b7-0fa1-4a88-a9f1-b3ae4e60f4ce';
export const UNAUTHENTICATE = 'b0924068-0487-4ffb-beb6-932261d65d0b';

export class AuthenticateAction implements Action {
    readonly type: string = AUTHENTICATE;
    constructor(public payload: any) { }
}

export class UnauthenticateAction implements Action {
    readonly type: string = UNAUTHENTICATE;
    constructor(public payload: any) { }
}

export function authenticationModelReducer(state: AuthenticationModel = {authenticated: AuthenticationState.Unknown}, action: AuthAction) {
  switch (action.type) {
    case AUTHENTICATE:
        return Object.assign({}, state, {id: action.payload.id, token: action.payload.token, authenticated: AuthenticationState.Authenticated});
    case UNAUTHENTICATE:
        return Object.assign({}, {authenticated: AuthenticationState.Unauthenticated});
    default:
        return state;
  }
}

export type AuthAction = AuthenticateAction | UnauthenticateAction;
