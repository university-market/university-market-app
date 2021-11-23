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
  @Input() tipo_pesquisa: number;
  @Input() cursoId: number;
  
  public publicacaoList : PublicacaoDetalheModel[];

  public lista: number

  constructor(
    private publicacaoService : PublicacaoService
  ) { }

  ngOnInit() {
    if(this.tipo_pesquisa == 1){
    this.publicacaoService.pesquisar(this.pesquisa)
      .subscribe(publicacoes => {
        this.publicacaoList = publicacoes
      })
    }else{
      this.publicacaoService.pesquisarByCurso(this.cursoId)
      .subscribe(publicacoes => {
        this.publicacaoList = publicacoes
      })
    }
  }
}
