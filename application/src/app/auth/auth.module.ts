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
import { ForgotService } from './services/forgot.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    DesignModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  providers:[
    ForgotService,
    LoginService,
    RegisterService
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
