import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileAccountDataComponent } from './components/profile-account-data/profile-account-data.component';
import { ProfileConfigComponent } from './components/profile-config/profile-config.component';
import { ProfilePublicacoesComponent } from './components/profile-publicacoes/profile-publicacoes.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'posts'
      }, {
        path: 'posts',
        component: ProfilePublicacoesComponent
      }, {
        path: 'account',
        component: ProfileAccountDataComponent
      }, {
        path: 'settings',
        component: ProfileConfigComponent
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
export class ProfileRoutingModule { }
