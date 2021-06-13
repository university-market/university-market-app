import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicacaoComponent } from './publicacao.component';
import { PublicacaoRoutingModule } from './publicacao-routing.module';
import { PublicacaoListComponent } from './publicacao-list/publicacao-list.component';
import { PublicacaoListItemComponent } from './publicacao-list/publicacao-list-item/publicacao-list-item.component';
import { PublicacaoDetalheComponent } from './publicacao-detalhe/publicacao-detalhe.component';
import { PublicacaoEdicaoComponent } from './publicacao-edicao/publicacao-edicao.component';
import { DesignModule } from 'src/app/design/design.module';
import { PublicacaoService } from './services/publicacao.service';
import { PublicacaoFormService } from './services/publicacao-form.service';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogConfirmDetalhesTecnicosComponent } from './dialogs/dialog-confirm-detalhes-tecnicos/dialog-confirm-detalhes-tecnicos.component';
import { PublicacaoLoadingComponent } from './publicacao-loading/publicacao-loading.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PublicacaoRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    DesignModule,
  ],
  declarations: [
    PublicacaoComponent,
    PublicacaoListComponent,
    PublicacaoListItemComponent,
    PublicacaoDetalheComponent,
    PublicacaoEdicaoComponent,
    DialogConfirmDetalhesTecnicosComponent,
    PublicacaoLoadingComponent,
  ],
  providers: [
    FormBuilder,
    PublicacaoService,
    PublicacaoFormService
  ]
})
export class PublicacaoModule { }
