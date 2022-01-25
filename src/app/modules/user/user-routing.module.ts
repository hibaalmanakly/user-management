import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './user.component';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'user-list',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
