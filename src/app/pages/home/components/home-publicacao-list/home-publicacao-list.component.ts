import { Component, OnInit } from '@angular/core';
import { SaleModel } from '../models/sale-model';
import { SaleHomeListService } from '../services/sale-home-list.service';

@Component({
  selector: 'app-home-publicacao-list',
  templateUrl: './home-publicacao-list.component.html',
  styleUrls: ['./home-publicacao-list.component.scss']
})
export class HomePublicacaoListComponent implements OnInit {

  sales : SaleModel[];

  constructor(private SaleHomeService: SaleHomeListService) { }

  ngOnInit() {

    this.SaleHomeService.listSale()
    .subscribe(sales => {
      this.sales = sales.slice(0, 5);
      console.log(sales)
    })
  }


}
