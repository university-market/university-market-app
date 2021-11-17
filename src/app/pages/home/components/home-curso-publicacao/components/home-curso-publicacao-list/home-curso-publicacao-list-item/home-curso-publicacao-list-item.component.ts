import { Component, Input, OnInit } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { SaleModel } from '../../../../models/sale-model';

@Component({
  selector: 'app-home-curso-publicacao-list-item',
  templateUrl: './home-curso-publicacao-list-item.component.html',
  styleUrls: ['./home-curso-publicacao-list-item.component.scss']
})
export class HomeCursoPublicacaoListItemComponent implements OnInit {

  
  @Input('sale') sale : SaleModel;

  public MASKS = utilsBr.MASKS;

  private _descriptionMaxLength = 100;

  constructor() { }
  

  ngOnInit() {


    // Definindo padrao template descricao tamanho maximo
    this._limitDescriptionLength();

    if(!this.sale.pathImagem){
      this.sale.pathImagem = 'assets/publicacao/default/no-image.png'
    }
  }

  

  private _limitDescriptionLength() {

    if (this.sale.descricao.length > this._descriptionMaxLength) {

      const complement = ' [...]';

      this.sale.descricao = 
        this.sale.descricao
          .substr(0, this._descriptionMaxLength)
          .concat(complement)
          .toString();
    }
  }
}
