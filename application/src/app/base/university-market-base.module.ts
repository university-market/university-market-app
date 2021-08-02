import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignBaseModule } from './design/design-base.module';
import { BaseConfirmDialogComponent } from './components/base-confirm-dialog/base-confirm-dialog.component';
import { BaseQrCodeDialogComponent } from './components/base-qr-code-dialog/base-qr-code-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DesignBaseModule,
  ],
  declarations: [
    BaseConfirmDialogComponent,
    BaseQrCodeDialogComponent,
  ],
  exports: [
    CommonModule,
    DesignBaseModule,
  ]
})
export class UniversityMarketBaseModule { }
