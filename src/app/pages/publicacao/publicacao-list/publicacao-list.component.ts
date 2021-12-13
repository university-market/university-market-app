import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PublicacaoDetalheModel } from '../models/publicacao-detalhe.model';
import { TipoPesquisa } from '../publicacao-search-list/publicacao-search-list.component';
import { PublicacaoService } from '../services/publicacao.service';

@Component({
  selector: 'app-publicacao-list',
  templateUrl: './publicacao-list.component.html',
  styleUrls: ['./publicacao-list.component.scss']
})
export class PublicacaoListComponent implements OnInit {

  private _cursoId: number = 0;
  private _pesquisa: string = null;
  private _tipo_pesquisa: TipoPesquisa = null;

  @Input() set pesquisa(value: string) {
    this._pesquisa = value;
  };

  @Input('tipo_pesquisa') set tipo_pesquisa(value: TipoPesquisa) {
    this._tipo_pesquisa = value;
  };
  @Input() set cursoId(value: number) {
    this._cursoId = value
  };
  
  public publicacaoList : PublicacaoDetalheModel[];

  public lista: number

  constructor(
    private publicacaoService : PublicacaoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.queryParams
      .pipe(
        switchMap(params => {

          if (params['cursoId'])
            return this.publicacaoService.pesquisarByCurso(params['cursoId']);

          return this.publicacaoService.pesquisar(params['pesquisa']);
        })
      )
      .subscribe(publicacoes => {

        this.publicacaoList = publicacoes;
      });
  }
}
