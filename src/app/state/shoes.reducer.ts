import { Action } from '@ngrx/store';
import { ShoeModel } from './shoe.model';

export const UPDATE_SHOE = '16414c61-a4ce-41d1-8112-33b8c1881983';

let shoes = new Map<String, ShoeModel>();

function compare(v1: ShoeModel, v2: ShoeModel) {
  if (v2.primary) {
    return 1;
  } else if (v1.primary) {
    return -1;
  } else {
    return v2.percentage > v1.percentage ? 1 : -1;
  }
}

export function shoesModelReducer(state: Array<ShoeModel> = [], action: Action) {
  switch (action.type) {
    case UPDATE_SHOE:
      shoes.set(action.payload['id'], action.payload);

      return Array.from(shoes.values()).sort((v1, v2) => compare(v1, v2));
    default:
      return state;
  }
}
