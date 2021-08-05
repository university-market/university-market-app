import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { SelectedChipDirective } from './directives/selected-chip.directive';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  declarations: []
})
export class SharedModule { }
