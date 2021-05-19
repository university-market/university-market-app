import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GridCoursesComponent } from './components/grid-courses/grid-courses.component';
import { HomeRoutingModule } from './home-routing.module';

import {MatGridListModule} from '@angular/material/grid-list';
import { DesignModule } from 'src/app/design/design.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule,
    DesignModule
  ],
  declarations: [
    HomeComponent,
    GridCoursesComponent
  ]
})
export class HomeModule { }
