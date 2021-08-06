import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateBaseComponent } from './template-base.component';
import { DesignBaseModule } from '../design/design-base.module';
import { TemplateBaseRoutingModule } from './template-base-routing.module';
import { HeaderComponent } from 'src/app/base/template/components/header/header.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuListItemComponent } from './components/menu-list/menu-list-item/menu-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateBaseRoutingModule,
    DesignBaseModule,
  ],
  declarations: [
    TemplateBaseComponent,
    HeaderComponent,
    MenuListComponent,
    MenuListItemComponent,
  ],
  exports: [TemplateBaseComponent]
})
export class TemplateBaseModule { }
