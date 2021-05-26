import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import("../pages/home/home.module").then(m => m.HomeModule)
    },
    {
      path: 'list',
      loadChildren: () => import("../pages/sale/sale.module").then(m => m.SaleModule)
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
