import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter, switchMap, take } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { PublicacaoService } from '../services/publicacao.service';
import { of } from 'rxjs';
import { PublicacaoDetalheModel } from '../models/publicacao-detalhe.model';
import { PublicacaoTag } from '../models/publicacao-tag.model';

@Component({
  selector: 'app-publicacao-detalhe',
  templateUrl: './publicacao-detalhe.component.html',
  styleUrls: ['./publicacao-detalhe.component.scss']
})
export class PublicacaoDetalheComponent implements OnInit {

  // imageTest = 'angular-background.png';
  // imageTest = 'EF-Core.png';
  imageTest = 'php-db-config.png';

  // Loading de carregamento dos dados
  public loadingDetails$ = this.service.loadingDetails$;

  public publicacao: PublicacaoDetalheModel = {} as PublicacaoDetalheModel;
  public tags: PublicacaoTag[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private service: PublicacaoService,
    private snackbar: SnackBarService
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
      this.tags = this.service.makeTagsArray(publicacao.tags);
    },
    error => {
      this.snackbar.error(error.error.message);
      this.location.back();
    });
  }

}
