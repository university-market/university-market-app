import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, switchMap, take } from 'rxjs/operators';

import { PublicacaoService } from '../services/publicacao.service';
import { PublicacaoDetalheModel } from '../models/publicacao-detalhe.model';
import { PublicacaoTag } from '../models/publicacao-tag.model';
import { PublicacaoDetalheContatoComponent } from './publicacao-detalhe-contato/publicacao-detalhe-contato.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publicacao-detalhe',
  templateUrl: './publicacao-detalhe.component.html',
  styleUrls: ['./publicacao-detalhe.component.scss']
})
export class PublicacaoDetalheComponent implements OnInit {

  // Gerenciamento de imagens
  public noImage = 'default/no-image.png';
  public baseImageResource = environment.apiUrl;

  // Loading de carregamento dos dados
  public loadingDetails$ = this.service.loadingDetails$;

  public publicacao: PublicacaoDetalheModel = {} as PublicacaoDetalheModel;
  public tags: PublicacaoTag[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private service: PublicacaoService,
    private _bottomSheet: MatBottomSheet
    ) { }

  ngOnInit() {

    this.route.paramMap
    .pipe(
      take(1),
      switchMap((p: Params) => {
        const publicacaoId = +p.get('publicacaoId');
  
        return this.service.init(publicacaoId);
      }),
      filter(p => p != null)
    )
    .subscribe(publicacao => {
      this.publicacao = publicacao;
      this.tags = publicacao.tags ? this.service.makeTagsArray(publicacao.tags) : [];
    },
    () => this.location.back());
  }

  public contatarVendedor(): void {
    this._bottomSheet.open(PublicacaoDetalheContatoComponent);
  }

}
