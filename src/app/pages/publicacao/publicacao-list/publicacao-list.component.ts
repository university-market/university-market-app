import { Component, Input, OnInit } from '@angular/core';
import { PublicacaoDetalheModel } from '../models/publicacao-detalhe.model';
import { PublicacaoService } from '../services/publicacao.service';

@Component({
  selector: 'app-publicacao-list',
  templateUrl: './publicacao-list.component.html',
  styleUrls: ['./publicacao-list.component.scss']
})
export class PublicacaoListComponent implements OnInit {

  @Input() pesquisa: string;

  public publicacaoList : PublicacaoDetalheModel[];

  constructor(
    private publicacaoService : PublicacaoService
  ) { }

  ngOnInit() {
    console.log(this.pesquisa)
    this.publicacaoService.pesquisar(this.pesquisa)
      .subscribe(publicacoes => {
        this.publicacaoList = publicacoes
      })
  }
}
