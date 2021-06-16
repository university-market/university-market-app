import { Component, OnInit } from '@angular/core';
import { NEW_RESOURCE } from 'src/app/shared/const/default-consts';

@Component({
  selector: 'app-sale-list-header',
  templateUrl: './sale-list-header.component.html',
  styleUrls: ['./sale-list-header.component.scss']
})
export class SaleListHeaderComponent implements OnInit {

  public NEW_RESOURCE = NEW_RESOURCE;

  constructor() { }

  ngOnInit() {
  }

}
