import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, of} from 'rxjs';

import {UserService} from '../../services/user.service';
import {UserAction} from '../actions';

@Injectable()

export class CreateUserEffect {
  constructor(private actions$: Actions,
              private userService: UserService) {
  }

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.createUser),
      concatMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user) => UserAction.createUserSuccess({user: user})),
          catchError(e => of(UserAction.createUserFailure({error: e.error.Message}))
          )
        )
      )
    );
  });
}
