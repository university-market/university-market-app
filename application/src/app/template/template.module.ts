import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DesignModule } from '../design/design.module';

import { TemplateComponent } from './template.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { SidebarComponent } from './components/header/sidebar/sidebar.component';
import { TemplateService } from './template.service';
import { TemplateRoutingModule } from './template-routing.module';
import { MenuListComponent } from './components/header/sidebar/menu-list/menu-list.component';

@NgModule({
  imports: [
    CommonModule,
    DesignModule,
    TemplateRoutingModule,
    RouterModule
  ],
  declarations: [
    TemplateComponent,
    HeaderComponent,
    ContentComponent,
    SidebarComponent,
    MenuListComponent
  ],
  exports: [
    TemplateComponent,
    HeaderComponent,
    ContentComponent,
    SidebarComponent
  ],
  providers: [
    TemplateService
  ]
})
export class TemplateModule { }
