import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacao-edicao-loading',
  templateUrl: './publicacao-edicao-loading.component.html',
  styleUrls: ['./publicacao-edicao-loading.component.scss']
})
export class PublicacaoEdicaoLoadingComponent implements OnInit {

  @Input('show') show: boolean = false;
  @Input('diameter') diameter: number = 50;

  constructor() { }

  ngOnInit() { }

}
