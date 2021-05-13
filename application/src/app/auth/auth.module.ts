import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
