import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {UserComponent} from './user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {CreateUserComponent} from './components/create-user/create-user.component';

@NgModule({
  declarations: [
    UserComponent,
    ListUsersComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
