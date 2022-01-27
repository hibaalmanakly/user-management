import {createReducer, on} from '@ngrx/store';

import {AppState} from '../../../../store/app.state';
import {UserAction} from '../actions';

import {PaginationResult} from '../../../../shared/models/pagination-result';
import {User} from '../../models/response/user';

export interface State extends AppState {
  users: UsersState
}

export interface UsersState {
  result: PaginationResult<User>;
  currentUser: User;
  error: string;
}

const initialState: UsersState = {
  result: new PaginationResult<User>(),
  currentUser: new User(),
  error: ''
};

export const usersReducer = createReducer<UsersState>(
  initialState,
  on(UserAction.loadUsersListSuccess, (state, action): UsersState => {
    return {
      ...state,
      result: action.result,
      error: ''
    };
  }),
  on(UserAction.setCurrentUser, (state, action): UsersState => {
    return {
      ...state,
      currentUser: action.user,
      error: ''
    };
  }),
  on(UserAction.initializeCurrentUser, (state): UsersState => {
    return {
      ...state,
      currentUser: new User(),
      error: ''
    };
  }),
  on(UserAction.createUserSuccess, (state, action): UsersState => {
    return {
      ...state,
      currentUser: action.user,
      error: ''
    };
  }),
  on(UserAction.createUserFailure, (state, action): UsersState => {
    return {
      ...state,
      currentUser: new User(),
      error: action.error
    };
  }),
  on(UserAction.editUserSuccess, (state, action): UsersState => {
    const updatedUsersList = state.result.data.map((user: User) => action.user.id === user.id ? action.user : user);
    return {
      ...state,
      result: {
        ...state.result,
        data: updatedUsersList
      },
      currentUser: action.user,
      error: ''
    };
  }),
  on(UserAction.editUserFailure, (state, action): UsersState => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(UserAction.deleteUserSuccess, (state, action): UsersState => {
    const updatedUsersList = state.result.data.filter((user) => user.id !== action.user.id);
    return {
      ...state,
      result: {
        ...state.result,
        data: updatedUsersList,
        totalrecord: state.result.totalrecord - 1
      },
      currentUser: new User(),
      error: ''
    };
  }),
  on(UserAction.deleteUserFailure, (state, action): UsersState => {
    return {
      ...state,
      error: action.error
    };
  })
);
