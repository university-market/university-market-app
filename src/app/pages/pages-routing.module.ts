import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from '../base/guards/navigation.guard';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'home'
    },
    {
      path: 'home',
      canActivate: [NavigationGuard],
      loadChildren: () => import("../pages/home/home.module").then(m => m.HomeModule)
    },
    {
      path: 'publicacao',
      canActivate: [NavigationGuard],
      runGuardsAndResolvers: 'always',
      loadChildren: () => import("../pages/publicacao/publicacao.module").then(m => m.PublicacaoModule)
    }, {
      path: 'perfil',
      canActivate: [NavigationGuard],
      loadChildren: () => import("../pages/profile/profile.module").then(m => m.ProfileModule)
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
