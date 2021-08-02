import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignMaterialComponentsModule } from './material/material-components/design-material-components.module';
import { DesignMaterialCdkModule } from './material/material-cdk/design-material-cdk.module';

@NgModule({
    imports: [
        CommonModule,
      ],
      declarations: [],
      exports: [
        DesignMaterialComponentsModule,
        DesignMaterialCdkModule,
      ]
})
export class DesignBaseModule { }
