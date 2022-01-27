import {ListUsersEffect} from './list-users.effect';
import {CreateUserEffect} from './create-user.effect';
import {EditUserEffect} from './edit-user.effect';
import {DeleteUserEffect} from './delete-user.effect';

export const usersEffect = [
  ListUsersEffect,
  CreateUserEffect,
  EditUserEffect,
  DeleteUserEffect
];
