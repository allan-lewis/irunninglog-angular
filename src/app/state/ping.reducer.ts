import { Action } from '@ngrx/store';
import { PingModel } from './ping.model';

export const PING_UPDATE = '0b71bfd3-c225-4295-a5e8-98952e03cc24';

export function pingModelReducer(state: PingModel = new PingModel(), action: Action) {
  switch (action.type) {
    case PING_UPDATE:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
