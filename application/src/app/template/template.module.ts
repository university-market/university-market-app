import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignModule } from '../design/design.module';

import { TemplateComponent } from './template.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    DesignModule
  ],
  declarations: [
    TemplateComponent,
    HeaderComponent,
  ],
  exports: [
    TemplateComponent,
    HeaderComponent,
  ]
})
export class TemplateModule { }
