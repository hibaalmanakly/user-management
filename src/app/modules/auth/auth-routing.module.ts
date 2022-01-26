import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from './auth.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
