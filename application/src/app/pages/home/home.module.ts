import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityMarketBaseModule } from 'src/app/base/university-market-base.module';

import { HomeComponent } from './home.component';
import { GridCoursesComponent } from './components/grid-courses/grid-courses.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePublicacaoImportantTagComponent } from './components/home-publicacao-important-tag/home-publicacao-important-tag.component';
import { HomePublicacaoListComponent } from './components/home-publicacao-list/home-publicacao-list.component';
import { HomePublicacaoListItemComponent } from './components/home-publicacao-list/home-publicacao-list-item/home-publicacao-list-item.component';
import { SaleHomeListService } from './components/services/sale-home-list.service';
import { GridCoursesService } from './components/services/grid-courses.service';
import { HomePublicacaoListHeaderComponent } from './components/home-publicacao-list-header/home-publicacao-list-header.component';
import { AboutUmComponent } from './components/about-um/about-um.component';
import { AboutUmItemComponent } from './components/about-um/about-um-item/about-um-item.component';
import { AboutUmHeaderComponent } from './components/about-um-header/about-um-header.component';


@NgModule({
  imports: [
    CommonModule,
    UniversityMarketBaseModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    GridCoursesComponent,
    HomePublicacaoListComponent,
    HomePublicacaoListItemComponent,
    HomePublicacaoImportantTagComponent,
    HomePublicacaoListHeaderComponent,
    AboutUmComponent,
    AboutUmItemComponent,
    AboutUmHeaderComponent
  ],
  providers:[
    SaleHomeListService,
    GridCoursesService
  ]
})
export class HomeModule { }
