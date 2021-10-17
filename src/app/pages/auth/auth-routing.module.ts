import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedefinirSenhaGuard } from 'src/app/base/guards/redefinirsenha.guard';

import { AuthComponent } from './auth.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component : AuthComponent,
    children: [
      {
        path : '',
        redirectTo: 'login'
      },
      {
        path : 'login',
        component: LoginComponent
      },
      {
        path : 'register',
        component: RegisterComponent
      },
      {
        path: 'redefinirsenha/:token',
        canActivate: [RedefinirSenhaGuard],
        component: RedefinirSenhaComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
