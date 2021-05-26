import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacaoComponent } from './publicacao.component';
import { PublicacaoRoutingModule } from './publicacao-routing.module';
import { PublicacaoListComponent } from './publicacao-list/publicacao-list.component';
import { PublicacaoListItemComponent } from './publicacao-list/publicacao-list-item/publicacao-list-item.component';
import { PublicacaoDetalheComponent } from './publicacao-detalhe/publicacao-detalhe.component';
import { PublicacaoEdicaoComponent } from './publicacao-edicao/publicacao-edicao.component';
import { DesignModule } from 'src/app/design/design.module';
import { PublicacaoService } from './services/publicacao.service';
import { PublicacaoFormService } from './services/publicacao-form.service';

@NgModule({
  imports: [
    CommonModule,
    PublicacaoRoutingModule,
    DesignModule,
  ],
  declarations: [
    PublicacaoComponent,
    PublicacaoListComponent,
    PublicacaoListItemComponent,
    PublicacaoDetalheComponent,
    PublicacaoEdicaoComponent
  ],
  providers: [
    PublicacaoService,
    PublicacaoFormService
  ]
})
export class PublicacaoModule { }
