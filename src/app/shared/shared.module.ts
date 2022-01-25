import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import {SharedComponent} from './shared.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const angular: any[] = [
  HttpClientModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
]

@NgModule({
  declarations: [
    SharedComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    angular
  ],
  exports: [
    ReactiveFormsModule,
    angular,
    PageNotFoundComponent,
  ]
})
export class SharedModule {
}
