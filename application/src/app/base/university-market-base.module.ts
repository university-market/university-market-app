import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignBaseModule } from './design/design-base.module';
import { BaseConfirmDialogComponent } from './components/base-confirm-dialog/base-confirm-dialog.component';
import { BaseQrCodeDialogComponent } from './components/base-qr-code-dialog/base-qr-code-dialog.component';
import { UniversityMarketPipesModule } from './pipes/university-market-pipes.module';
import { UniversityMarketInterceptor } from './interceptors/university-market-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    DesignBaseModule,
    UniversityMarketPipesModule,
  ],
  declarations: [
    BaseConfirmDialogComponent,
    BaseQrCodeDialogComponent,
  ],
  exports: [
    CommonModule,
    DesignBaseModule,
    UniversityMarketPipesModule,
  ],
  providers: [
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    // UniversityMarketInterceptor, 
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: UniversityMarketInterceptor,
    //   multi: true
    // }
  ]
})
export class UniversityMarketBaseModule { }
