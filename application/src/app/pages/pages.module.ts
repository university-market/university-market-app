import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { DesignModule } from '../design/design.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    DesignModule,
    SharedModule
  ],
  declarations: [
    
  ],
  exports: [RouterModule]
})
export class PagesModule { }
