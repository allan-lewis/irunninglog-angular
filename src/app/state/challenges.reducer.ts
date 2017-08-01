import { Action } from '@ngrx/store';
import { ChallengeModel } from './challenge.model';

export const UPDATE_CHALLENGE = '1dae628e-8e7d-4a8f-9cc4-1abc8895981b';

let map = new Map<String, ChallengeModel>();

export function challengesModelReducer(state: Array<ChallengeModel> = [], action: Action) {
  switch (action.type) {
    case UPDATE_CHALLENGE:
      map.set(action.payload['name'], action.payload);

      return Array.from(map.values());
    default:
      return state;
  }
}
