import { Action } from '@ngrx/store';
import { IProgressItem } from './progress-item.model';

export const UPDATE_CHALLENGES = '7ab68622-18e1-4f12-a2b6-494febdc2dbd';
export const UPDATE_SHOES = 'a75e69f9-82c4-42f8-a9cc-be5de90686fa';
export const UPDATE_STREAKS = 'aeb467d0-8cbd-4312-9b42-308f1c34af82';

export function progressListReducer(state: Array<IProgressItem> = [], action: Action) {
  
  switch (action.type) {
      default:
        return state;
  }

}
