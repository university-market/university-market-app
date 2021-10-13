import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicacaoListagemModel } from 'src/app/pages/publicacao/models/publicacao-listagem.model';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-publicacoes-excluir',
  templateUrl: './publicacoes-excluir.component.html',
  styleUrls: ['./publicacoes-excluir.component.scss']
})
export class PublicacoesExcluirComponent implements OnInit {

  private publicacoes: PublicacaoListagemModel[];

  constructor(
    private dialog: MatDialog,
    private ProfileService : ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: {
              publicacaoId : number,
              descricao    : string,
              valor        : string,
              titulo       : string 
            }) { }

  ngOnInit() {}
  
  deletePublicacao(){
    this.ProfileService.deletePublicacao(this.data.publicacaoId);
    this.dialog.closeAll();
    location.reload();
  }
}
