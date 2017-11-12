import { Action } from '@ngrx/store';
import { ChallengesModel } from './challenges.model';

export const UPDATE_CHALLENGE = '1dae628e-8e7d-4a8f-9cc4-1abc8895981b';

export function challengesModelReducer(state: ChallengesModel = { challenges: [] }, action: Action) {
  switch (action.type) {
    case UPDATE_CHALLENGE:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
