import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleComponent } from './sale.component';

const routes: Routes = [
  {
    path: '',
    component: SaleListComponent
  },
  {
    path: 'course/:id',
    component: SaleComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
