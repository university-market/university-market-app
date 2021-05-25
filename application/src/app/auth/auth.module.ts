import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DesignModule } from '../design/design.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    DesignModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    AuthComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
