import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { DesignModule } from '../design/design.module';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PublicacaoModule } from './publicacao/publicacao.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomeModule,
    DesignModule,
    SharedModule,
    PublicacaoModule
  ],
  declarations: [
    
  ],
  exports: [RouterModule]
})
export class PagesModule { }
