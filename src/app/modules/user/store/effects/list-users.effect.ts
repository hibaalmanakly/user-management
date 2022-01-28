import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';

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
          map((result) => UserAction.loadUsersListSuccess({result: result})),
          catchError((error) => of(UserAction.loadUsersListFailure({error: error.error})))
        )
      )
    );
  });
}
