import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DesignMaterialComponentsModule } from './material/material-components/design-material-components.module';
import { DesignMaterialCdkModule } from './material/material-cdk/design-material-cdk.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [],
  exports: [
    DesignMaterialComponentsModule,
    DesignMaterialCdkModule,
    FlexLayoutModule,
  ]
})
export class DesignBaseModule { }
