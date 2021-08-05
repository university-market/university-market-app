import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacao-loading',
  templateUrl: './publicacao-loading.component.html',
  styleUrls: ['./publicacao-loading.component.scss']
})
export class PublicacaoLoadingComponent implements OnInit {

  @Input('show') show: boolean = false;
  @Input('diameter') diameter: number = 50;

  constructor() { }

  ngOnInit() { }

}
