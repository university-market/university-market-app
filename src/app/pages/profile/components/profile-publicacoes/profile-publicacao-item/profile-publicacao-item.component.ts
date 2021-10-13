import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PublicacaoListagemModel } from 'src/app/pages/publicacao/models/publicacao-listagem.model';
import { PublicacoesExcluirComponent } from '../publicacoes-excluir/publicacoes-excluir.component';

@Component({
  selector: 'app-profile-publicacao-item',
  templateUrl: './profile-publicacao-item.component.html',
  styleUrls: ['./profile-publicacao-item.component.scss']
})
export class ProfilePublicacaoItemComponent implements OnInit {

  @Input('publicacao') publicacao: PublicacaoListagemModel; 

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  excluir(){
    this.dialog.open(PublicacoesExcluirComponent,{
      data :{ publicacaoId  : this.publicacao.publicacaoId,
              descricao     : this.publicacao.descricao,
              valor         : this.publicacao.valor,
              titulo        : this.publicacao.titulo
            },
      })

  }
}
