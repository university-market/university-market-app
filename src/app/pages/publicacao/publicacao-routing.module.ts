import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicacaoComponent } from './publicacao.component';
import { PublicacaoDetalheComponent } from './publicacao-detalhe/publicacao-detalhe.component';
import { PublicacaoEdicaoComponent } from './publicacao-edicao/publicacao-edicao.component';

const routes: Routes = [
  {
    path: '',
    component: PublicacaoComponent,
  }, {
    path: ':publicacaoId',
    component: PublicacaoDetalheComponent,
  }, {
    path: 'edit/:publicacaoId',
    component: PublicacaoEdicaoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PublicacaoRoutingModule { }
