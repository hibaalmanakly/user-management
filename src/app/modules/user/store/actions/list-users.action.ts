import {createAction, props} from '@ngrx/store';

import {PaginationResult} from '../../../../shared/models/pagination-result';
import {User} from '../../models/response/user';

export enum ActionTypes {
  LoadUsers = '[User] Load Users List',
  LoadUsersSuccess = '[User] Success Load Users List',
  GetCurrentUser = '[User] Get Current User',
  SetCurrentUser = '[User] Set Current User',
  InitializeCurrentUser = '[User] Initialize Current User'
}

export const loadUsersList = createAction(
  ActionTypes.LoadUsers,
  props<{ pageNumber: number }>()
);

export const loadUsersListSuccess = createAction(
  ActionTypes.LoadUsersSuccess,
  props<{ result: PaginationResult<User> }>()
);

export const getCurrentUser = createAction(
  ActionTypes.GetCurrentUser
);

export const setCurrentUser = createAction(
  ActionTypes.SetCurrentUser,
  props<{ user: User }>()
);

export const initializeCurrentUser = createAction(
  ActionTypes.InitializeCurrentUser
);

