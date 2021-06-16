import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GridCoursesComponent } from './components/grid-courses/grid-courses.component';
import { HomeRoutingModule } from './home-routing.module';

import { DesignModule } from 'src/app/design/design.module';
import { NgBrazil } from 'ng-brazil';
import { HomePublicacaoImportantTagComponent } from './components/home-publicacao-important-tag/home-publicacao-important-tag.component';
import { HomePublicacaoListComponent } from './components/home-publicacao-list/home-publicacao-list.component';
import { HomePublicacaoListItemComponent } from './components/home-publicacao-list/home-publicacao-list-item/home-publicacao-list-item.component';
import { SaleHomeListService } from './components/services/sale-home-list.service';
import { GridCoursesService } from './components/services/grid-courses.service';
import { HomePublicacaoListHeaderComponent } from './components/home-publicacao-list-header/home-publicacao-list-header.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    DesignModule,
    NgBrazil
  ],
  declarations: [
    HomeComponent,
    GridCoursesComponent,
    HomePublicacaoListComponent,
    HomePublicacaoListItemComponent,
    HomePublicacaoImportantTagComponent,
    HomePublicacaoListHeaderComponent
  ],
  providers:[
    SaleHomeListService,
    GridCoursesService
  ]
})
export class HomeModule { }
