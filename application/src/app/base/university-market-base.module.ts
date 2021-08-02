import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignBaseModule } from './design/design-base.module';

@NgModule({
  imports: [
    CommonModule,
    DesignBaseModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    DesignBaseModule,
  ]
})
export class UniversityMarketBaseModule { }
