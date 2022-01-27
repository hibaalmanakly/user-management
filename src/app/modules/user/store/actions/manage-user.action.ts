import {createAction, props} from '@ngrx/store';

import {User} from '../../models/response/user';

export enum ActionTypes {
  CreateUser = '[User] Create User',
  CreateUserSuccess = '[User] Success Create User',
  CreateUserFailure = '[User] Fail Create User',
  EditUser = '[User] Edit User',
  EditUserSuccess = '[User] Success Edit User',
  EditUserFailure = '[User] Fail Edit User',
  DeleteUser = '[User] Delete User',
  DeleteUserSuccess = '[User] Success Delete User',
  DeleteUserFailure = '[User] Fail Delete User',
}

export const createUser = createAction(
  ActionTypes.CreateUser,
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  ActionTypes.CreateUserSuccess,
  props<{ user: User }>()
);

export const createUserFailure = createAction(
  ActionTypes.CreateUserFailure,
  props<{ error: string }>()
);

export const editUser = createAction(
  ActionTypes.EditUser,
  props<{ user: User }>()
);

export const editUserSuccess = createAction(
  ActionTypes.EditUserSuccess,
  props<{ user: User }>()
);

export const editUserFailure = createAction(
  ActionTypes.EditUserFailure,
  props<{ error: string }>()
);

export const deleteUser = createAction(
  ActionTypes.DeleteUser,
  props<{ user: User }>()
);

export const deleteUserSuccess = createAction(
  ActionTypes.DeleteUserSuccess,
  props<{ user: User }>()
);

export const deleteUserFailure = createAction(
  ActionTypes.DeleteUserFailure,
  props<{ error: string }>()
);
