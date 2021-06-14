import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, switchMap, take } from 'rxjs/operators';

import { PublicacaoService } from '../services/publicacao.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { PublicacaoDetalheModel } from '../models/publicacao-detalhe.model';
import { PublicacaoTag } from '../models/publicacao-tag.model';
import { PublicacaoDetalheContatoComponent } from './publicacao-detalhe-contato/publicacao-detalhe-contato.component';

@Component({
  selector: 'app-publicacao-detalhe',
  templateUrl: './publicacao-detalhe.component.html',
  styleUrls: ['./publicacao-detalhe.component.scss']
})
export class PublicacaoDetalheComponent implements OnInit {

  // imageTest = 'angular-background.png';
  // imageTest = 'EF-Core.png';
  // imageTest = 'php-db-config.png';
  imageTest = 'default/no-image.png';

  // Loading de carregamento dos dados
  public loadingDetails$ = this.service.loadingDetails$;

  public publicacao: PublicacaoDetalheModel = {} as PublicacaoDetalheModel;
  public tags: PublicacaoTag[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private service: PublicacaoService,
    private snackbar: SnackBarService,
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
    error => {
      this.snackbar.error(error.error.message);
      this.location.back();
    });
  }

  public contatarVendedor(): void {
    this._bottomSheet.open(PublicacaoDetalheContatoComponent);
  }

}
