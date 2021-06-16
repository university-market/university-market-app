import { Component, Input, OnInit } from '@angular/core';
import { utilsBr } from 'js-brasil';
import { SaleModel } from '../../../models/sale-model';

@Component({
  selector: 'app-sale-list-item',
  templateUrl: './sale-list-item.component.html',
  styleUrls: ['./sale-list-item.component.scss']
})
export class SaleListItemComponent implements OnInit {

  @Input('sale') sale : SaleModel;

  public MASKS = utilsBr.MASKS;

  private _descriptionMaxLength = 100;

  constructor() { }
  

  ngOnInit() {


    // Definindo padrao template descricao tamanho maximo
    this._limitDescriptionLength();
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
