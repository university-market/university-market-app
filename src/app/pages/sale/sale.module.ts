import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityMarketBaseModule } from 'src/app/base/university-market-base.module';

import { SaleComponent } from './sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleListService } from './services/sale-list.service';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleListItemComponent } from './components/sale-list/sale-list-item/sale-list-item.component';
import { SaleImportantTagComponent } from './components/sale-important-tag/sale-important-tag.component';
import { SaleListHeaderComponent } from './components/sale-list-header/sale-list-header.component';
import { SaleListHeaderService } from './services/sale-list-header.service';

@NgModule({
  imports: [
    CommonModule,
    UniversityMarketBaseModule,
    SaleRoutingModule,
  ],
  declarations: [
    SaleComponent,
    SaleListComponent,
    SaleListItemComponent,
    SaleImportantTagComponent,
    SaleListHeaderComponent
  ],
  providers:[
    SaleListService,
    SaleListHeaderService
  ]
})
export class SaleModule { }
