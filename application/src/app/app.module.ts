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
import { TitleService } from './shared/services/title.service';
import { SharedModule } from './shared/shared.module';
import { TemplateModule } from './template/template.module';

@NgModule({
  declarations: [
    AppComponent
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
    TitleService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
