import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {UserComponent} from './user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {UserFormComponent} from './components/user-form/user-form.component';

import {usersReducer} from './store/reducers/users.reducer';
import {usersEffect} from './store/effects';

@NgModule({
  declarations: [
    UserComponent,
    ListUsersComponent,
    CreateUserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature(usersEffect)
  ]
})
export class UserModule {
}
