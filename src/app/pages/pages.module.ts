import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { SaleModule } from './sale/sale.module';

import { PublicacaoModule } from './publicacao/publicacao.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomeModule,
    SharedModule,
    SaleModule,
    PublicacaoModule,
    ProfileModule

  ],
  declarations: [
    
  ],
  exports: [RouterModule]
})
export class PagesModule { }
