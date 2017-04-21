import { Action } from '@ngrx/store';

export const USERNAME_ASSIGN = '7b923e6b-b04f-4162-a250-1efe4b71b931';

export function usernameReducer(state: string = "", action: Action) {
  switch (action.type) {
    case USERNAME_ASSIGN:
      return action.payload;
    default:
      return state;
  }
}
