import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, of} from 'rxjs';

import {UserService} from '../../services/user.service';
import {UserAction} from '../actions';

@Injectable()

export class EditUserEffect {
  constructor(private actions$: Actions,
              private userService: UserService) {
  }

  editUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.editUser),
      concatMap((action) =>
        this.userService.editUser(action.user).pipe(
          map((user) => UserAction.editUserSuccess({user: user})),
          catchError(error => of(UserAction.editUserFailure({error: error.Message})))
        )
      )
    );
  });
}
