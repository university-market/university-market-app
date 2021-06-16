import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SaleModel } from '../../models/sale-model';
import { SaleListService } from '../../services/sale-list.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {
  
  sales : SaleModel[];

  constructor(private SaleService: SaleListService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.activatedRoute.queryParams.pipe(
      switchMap(() => {
        let id = this.activatedRoute.snapshot.params['id'];
        return this.SaleService.listSaleByCourseId(id)})
    ).subscribe(sales => {
      this.sales = sales;
      console.log(sales)
    })
  }

  

}
