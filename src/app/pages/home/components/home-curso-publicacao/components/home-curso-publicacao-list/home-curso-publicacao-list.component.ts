import { Component, OnInit } from '@angular/core';
import { SaleModel } from '../../../models/sale-model';
import { SaleHomeListService } from '../../../services/sale-home-list.service';

@Component({
  selector: 'app-home-curso-publicacao-list',
  templateUrl: './home-curso-publicacao-list.component.html',
  styleUrls: ['./home-curso-publicacao-list.component.scss']
})
export class HomeCursoPublicacaoListComponent implements OnInit {

  sales : SaleModel[] = [];

  constructor(private SaleHomeService: SaleHomeListService) { }

  ngOnInit() {

    this.SaleHomeService.listSalebyCourse()
      .subscribe(sales => {
        this.sales = sales.slice(0, 5);
      });
  }

}
