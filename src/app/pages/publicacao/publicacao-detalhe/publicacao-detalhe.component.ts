import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { PublicacaoService } from '../services/publicacao.service';
import { PublicacaoDetalheModel } from '../models/publicacao-detalhe.model';
import { PublicacaoTag } from '../models/publicacao-tag.model';
import { PublicacaoDetalheContatoComponent } from './publicacao-detalhe-contato/publicacao-detalhe-contato.component';
import { environment } from 'src/environments/environment';
import { PublicacaoDenunciaComponent } from './publicacao-denuncia/publicacao-denuncia.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/base/services/notification.service';

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
    private _bottomSheet: MatBottomSheet,
    public  dialog: MatDialog,
    private notification: NotificationService,
    ) { }

  ngOnInit() {

    this.route.paramMap
    .pipe(
      take(1),
      switchMap((p: Params) => {
        const publicacaoId = +p.get('publicacaoId');
  
        return this.service.init(publicacaoId);
      }),
      filter(p => p != null),
      catchError(err => {
        this.router.navigate(['../'], {relativeTo: this.route});
        throw err;
      })
    )
    .subscribe(publicacao => {
      this.publicacao = publicacao;
      this.tags = publicacao.tags ? this.service.makeTagsArray(publicacao.tags) : [];
    });
  }

  public contatarVendedor(): void {
    this._bottomSheet.open(PublicacaoDetalheContatoComponent,{
      data: {id: this.publicacao.estudanteId,
            titulo: this.publicacao.titulo}
    });
  }

  denunciar(publicacao:PublicacaoDetalheModel ){
    this.dialog.open(PublicacaoDenunciaComponent,{
      width : '700px',
      maxWidth: '80%',
      data: publicacao
    }).afterClosed().pipe( 
      filter((model) => {
        
        if(!model){
          return false;
        }
        return true;
      }),
      switchMap(model => 
        this.service.denunciar(model)
      ),
    ).subscribe((model) => {
      this.notification.success('Denúncia cadastrada com sucesso');  
      // this.contatos.push(model)
      // console.log(this.contatos)
    })
  }

}
