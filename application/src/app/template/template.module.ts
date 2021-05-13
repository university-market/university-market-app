import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DesignModule } from '../design/design.module';

import { TemplateComponent } from './template.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  imports: [
    CommonModule,
    DesignModule,
    RouterModule
  ],
  declarations: [
    TemplateComponent,
    HeaderComponent,
    ContentComponent,
  ],
  exports: [
    TemplateComponent,
    HeaderComponent,
    ContentComponent,
  ]
})
export class TemplateModule { }
