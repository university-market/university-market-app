import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UniversityMarketBaseModule } from '../../base/university-market-base.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { LoginService } from './services/login.service';

import { HeaderComponent } from './components/header/header.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';


@NgModule({
  imports: [
    CommonModule,
    UniversityMarketBaseModule,
    AuthRoutingModule,
  ],
  declarations: [
    AuthComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RedefinirSenhaComponent
  ],
  providers: [
    LoginService,
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
