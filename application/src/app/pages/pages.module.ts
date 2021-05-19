import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { DesignModule } from '../design/design.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    DesignModule
  ],
  declarations: [
    
  ],
  exports: [RouterModule]
})
export class PagesModule { }
