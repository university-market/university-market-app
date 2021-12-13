import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicacaoComponent } from './publicacao.component';
import { PublicacaoDetalheComponent } from './publicacao-detalhe/publicacao-detalhe.component';
import { PublicacaoEdicaoComponent } from './publicacao-edicao/publicacao-edicao.component';
import { PublicacaoSearchListComponent } from './publicacao-search-list/publicacao-search-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'lista'
  },
  {
    path: 'lista',
    component: PublicacaoComponent,
  }, 
  {
    path: 'nova',
    component: PublicacaoEdicaoComponent
  },
  {
    path: 'busca',
    component: PublicacaoSearchListComponent
  },
  {
    path: 'busca/curso',
    component: PublicacaoSearchListComponent
  },
  {
    path: ':publicacaoId',
    children: [
      {
        path: '',
        component: PublicacaoDetalheComponent,
      },
      {
        path: 'editar',
        component: PublicacaoEdicaoComponent
      }
    ]
  }, 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PublicacaoRoutingModule { }
