import { Action } from '@ngrx/store';
import { ChallengeModel } from './challenge.model';

export const UPDATE_CHALLENGE = '1dae628e-8e7d-4a8f-9cc4-1abc8895981b';

export function challengesModelReducer(state: Array<ChallengeModel> = [], action: Action) {
  switch (action.type) {
    case UPDATE_CHALLENGE:
          return [
              ...state,
              action.payload
          ];
    default:
      return state;
  }
}