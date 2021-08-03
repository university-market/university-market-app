import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil }from 'ng-brazil';

import { DesignModule } from './design/design.module';
import { PagesModule } from './pages/pages.module';
import { SnackBarService } from './shared/services/snack-bar.service';
import { SharedModule } from './shared/shared.module';
import { TemplateModule } from './template/template.module';
import { SelectedChipDirective } from './shared/directives/selected-chip.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './base/interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SelectedChipDirective, // Diretiva
  ],
  exports: [
    SelectedChipDirective, // Diretiva
  ],
  imports: [
    NgBrazil,
    TextMaskModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DesignModule,
    PagesModule,
    SharedModule,
    TemplateModule
  ],
  providers: [
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
