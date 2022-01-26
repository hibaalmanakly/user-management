import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {UserComponent} from './user.component';
import {ListComponent} from './components/list/list.component';
import {CreateComponent} from './components/create/create.component';

@NgModule({
  declarations: [
    UserComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
