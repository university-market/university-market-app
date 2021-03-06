import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth-interceptor.service';

import { DesignBaseModule } from './design/design-base.module';
import { UniversityMarketPipesModule } from './pipes/university-market-pipes.module';

import { BaseConfirmDialogComponent } from './components/base-confirm-dialog/base-confirm-dialog.component';
import { BaseQrCodeDialogComponent } from './components/base-qr-code-dialog/base-qr-code-dialog.component';

import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    // Commom modules
    CommonModule,

    // Angular Forms
    FormsModule,
    ReactiveFormsModule,

    // Mascaras de texto
    TextMaskModule,
    NgBrazil,

    // Modulos de design
    DesignBaseModule,

    // Application Base
    UniversityMarketPipesModule,
  ],
  declarations: [
    BaseConfirmDialogComponent,
    BaseQrCodeDialogComponent,
  ],
  exports: [
    // Angular Forms
    FormsModule,
    ReactiveFormsModule,

    // Mascaras de texto
    TextMaskModule,
    NgBrazil,

    // Application Base
    DesignBaseModule,
    UniversityMarketPipesModule,

    RouterModule
  ],
  providers: [
    FormBuilder,
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
