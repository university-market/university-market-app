import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleListService } from './services/sale-list.service';
import { DesignModule } from 'src/app/design/design.module';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleListItemComponent } from './components/sale-list/sale-list-item/sale-list-item.component';
import { SaleImportantTagComponent } from './components/sale-important-tag/sale-important-tag.component';
import { SaleListHeaderComponent } from './components/sale-list-header/sale-list-header.component';
import { NgBrazil } from 'ng-brazil';

@NgModule({
  imports: [
    CommonModule,
    SaleRoutingModule,
    DesignModule,
    NgBrazil
  ],
  declarations: [
    SaleComponent,
    SaleListComponent,
    SaleListItemComponent,
    SaleImportantTagComponent,
    SaleListHeaderComponent
  ],
  providers:[
    SaleListService
  ]
})
export class SaleModule { }
