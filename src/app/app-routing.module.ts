import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from "./app.component";
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    // component: AppComponent
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
