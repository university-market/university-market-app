import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-publicacao-important-tag',
  templateUrl: './home-publicacao-important-tag.component.html',
  styleUrls: ['./home-publicacao-important-tag.component.scss']
})
export class HomePublicacaoImportantTagComponent implements OnInit {

  @Input('label') label: string = '';
  @Input('color') color: string = 'default';

  constructor() { }

  ngOnInit() {
  }

}
