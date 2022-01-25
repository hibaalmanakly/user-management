import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AuthComponent} from './auth.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {
}
