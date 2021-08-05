import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NEW_RESOURCE } from 'src/app/shared/const/default-consts';
import { SaleListHeaderModel } from '../../models/sale-list-header-model';
import { SaleListHeaderService } from '../../services/sale-list-header.service';

@Component({
  selector: 'app-sale-list-header',
  templateUrl: './sale-list-header.component.html',
  styleUrls: ['./sale-list-header.component.scss']
})
export class SaleListHeaderComponent implements OnInit {

  public NEW_RESOURCE = NEW_RESOURCE;

  headers : SaleListHeaderModel[];

  constructor(private activatedRoute: ActivatedRoute,
             private SaleListHeaderService : SaleListHeaderService ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      switchMap(() => {
        let id = this.activatedRoute.snapshot.params['id'];
        return this.SaleListHeaderService.obterNomeCurso(id)})
    ).subscribe(headers => {
      this.headers = headers;
      console.log(headers)
    })
  }

}
