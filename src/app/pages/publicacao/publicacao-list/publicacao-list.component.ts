import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacao-list',
  templateUrl: './publicacao-list.component.html',
  styleUrls: ['./publicacao-list.component.scss']
})
export class PublicacaoListComponent implements OnInit {

  public publicacaoList = [];

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.publicacaoList.push(true);
    this.publicacaoList.push(true);
    this.publicacaoList.push(true);
    this.publicacaoList.push(true);
    this.publicacaoList.push(true);
    this.publicacaoList.push(true);
    this.publicacaoList.push(true);
    this.publicacaoList.push(true);
  }

}
