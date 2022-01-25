import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedComponent} from './shared.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    SharedComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class SharedModule {
}
