import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs';

import {UserService} from '../../services/user.service';
import {UserAction} from '../actions';

@Injectable()

export class ListUsersEffect {
  constructor(private actions$: Actions,
              private userService: UserService) {
  }

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.loadUsersList),
      mergeMap((action) =>
        this.userService.getAllUsers(action.pageNumber).pipe(
          map((result) => UserAction.loadUsersListSuccess({result: result}))
        )
      )
    );
  });
}
