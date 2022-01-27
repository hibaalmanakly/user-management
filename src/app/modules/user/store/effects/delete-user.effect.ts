import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, of} from 'rxjs';

import {UserService} from '../../services/user.service';
import {UserAction} from '../actions';

@Injectable()

export class DeleteUserEffect {
  constructor(private actions$: Actions,
              private userService: UserService) {
  }

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.deleteUser),
      concatMap((action) =>
        this.userService.deleteUser(action.user.id).pipe(
          map((user) => UserAction.deleteUserSuccess({user: user})),
          catchError(error => of(UserAction.deleteUserFailure({error: error.Message})))
        )
      )
    );
  });
}
