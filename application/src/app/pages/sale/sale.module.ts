import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleListService } from './services/sale-list.service';
import { DesignModule } from 'src/app/design/design.module';
import { SaleListComponent } from './components/sale-list/sale-list.component';

@NgModule({
  imports: [
    CommonModule,
    SaleRoutingModule,
    DesignModule
  ],
  declarations: [
    SaleComponent,
    SaleListComponent
  ],
  providers:[
    SaleListService
  ]
})
export class SaleModule { }
