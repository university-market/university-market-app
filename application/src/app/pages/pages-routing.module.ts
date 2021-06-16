import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import("../pages/home/home.module").then(m => m.HomeModule)

    },
    {
      path: 'sales',
      loadChildren: () => import("../pages/sale/sale.module").then(m => m.SaleModule)

    }, {
      path: 'publicacao',
      loadChildren: () => import("../pages/publicacao/publicacao.module").then(m => m.PublicacaoModule)

    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
