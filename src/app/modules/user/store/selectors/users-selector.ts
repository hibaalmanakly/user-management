import {createFeatureSelector, createSelector} from '@ngrx/store';

import {UsersState} from '../reducers/users.reducer';

const getUsersListFeatureState = createFeatureSelector<UsersState>('users');

export const getUsersList = createSelector(
  getUsersListFeatureState,
  (state) => state.result
);

export const getCurrentUser = createSelector(
  getUsersListFeatureState,
  (state) => state.currentUser
);

export const getError = createSelector(
  getUsersListFeatureState,
  (state) => state.error
);
