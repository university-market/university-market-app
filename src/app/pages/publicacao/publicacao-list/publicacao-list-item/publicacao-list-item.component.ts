import { Component, Input, OnInit } from '@angular/core';
import { PublicacaoListagemModel } from '../../models/publicacao-listagem.model';
import { utilsBr } from 'js-brasil';

@Component({
  selector: 'app-publicacao-list-item',
  templateUrl: './publicacao-list-item.component.html',
  styleUrls: ['./publicacao-list-item.component.scss']
})
export class PublicacaoListItemComponent implements OnInit {

  @Input('publicacao') publicacao: PublicacaoListagemModel = {
    publicacaoId: 1,
    titulo: 'Publicação teste título',
    descricao: 'Uma descricao qualquer para teste a nova publicacao, e complemento de descrição para ser visualizado no componente de detalhes da publicação. Espero que funcione',
    pathImagem: '',
    valor: 2849.9
  };

  public MASKS = utilsBr.MASKS;

  private _descriptionMaxLength = 100;
  constructor() { }

  ngOnInit() {
    // Definindo padrao template descricao tamanho maximo
    this._limitDescriptionLength();
  }

  private _limitDescriptionLength() {

    if (this.publicacao.descricao.length > this._descriptionMaxLength) {

      const complement = ' [...]';

      this.publicacao.descricao = 
        this.publicacao.descricao
          .substr(0, this._descriptionMaxLength)
          .concat(complement)
          .toString();
    }
  }

}
