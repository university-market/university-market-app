import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityMarketBaseModule } from 'src/app/base/university-market-base.module';

import { PublicacaoComponent } from './publicacao.component';
import { PublicacaoRoutingModule } from './publicacao-routing.module';
import { PublicacaoListComponent } from './publicacao-list/publicacao-list.component';
import { PublicacaoListItemComponent } from './publicacao-list/publicacao-list-item/publicacao-list-item.component';
import { PublicacaoDetalheComponent } from './publicacao-detalhe/publicacao-detalhe.component';
import { PublicacaoEdicaoComponent } from './publicacao-edicao/publicacao-edicao.component';
import { PublicacaoService } from './services/publicacao.service';
import { PublicacaoFormService } from './services/publicacao-form.service';
import { PublicacaoLoadingComponent } from './components/publicacao-loading/publicacao-loading.component';
import { PublicacaoListHeaderComponent } from './components/publicacao-list-header/publicacao-list-header.component';
import { PublicacaoImportantTagComponent } from './components/publicacao-important-tag/publicacao-important-tag.component';
import { PublicacaoDetalheContatoComponent } from './publicacao-detalhe/publicacao-detalhe-contato/publicacao-detalhe-contato.component';
import { PublicacaoDenunciaComponent } from './publicacao-detalhe/publicacao-denuncia/publicacao-denuncia.component';
import { DenunciaService } from './services/denuncia.service';
import { PublicacaoSearchListComponent } from './publicacao-search-list/publicacao-search-list.component';
import { PesquisaComponent } from './publicacao-search-list/pesquisa/pesquisa.component';
@NgModule({
  imports: [
    CommonModule,
    UniversityMarketBaseModule,
    PublicacaoRoutingModule,
  ],
  declarations: [
    PublicacaoComponent,
    PublicacaoListComponent,
    PublicacaoListItemComponent,
    PublicacaoDetalheComponent,
    PublicacaoEdicaoComponent,
    PublicacaoLoadingComponent,
    PublicacaoListHeaderComponent,
    PublicacaoImportantTagComponent,
    PublicacaoDetalheContatoComponent,
    PublicacaoDenunciaComponent,
    PublicacaoSearchListComponent,
    PesquisaComponent
  ],
  providers: [
    PublicacaoService,
    PublicacaoFormService,
    DenunciaService
  ]
})
export class PublicacaoModule { }
