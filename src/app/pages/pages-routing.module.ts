import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'home'
    },
    {
      path: 'home',
      loadChildren: () => import("../pages/home/home.module").then(m => m.HomeModule)
    },
    {
      path: 'sales',
      loadChildren: () => import("../pages/sale/sale.module").then(m => m.SaleModule)

    }, {
      path: 'publicacao',
      loadChildren: () => import("../pages/publicacao/publicacao.module").then(m => m.PublicacaoModule)
    }, {
      path: 'perfil',
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
