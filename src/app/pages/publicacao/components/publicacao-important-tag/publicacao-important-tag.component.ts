import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacao-important-tag',
  templateUrl: './publicacao-important-tag.component.html',
  styleUrls: ['./publicacao-important-tag.component.scss']
})
export class PublicacaoImportantTagComponent implements OnInit {

  @Input('label') label: string = '';
  @Input('color') color: string = 'default';

  constructor() { }

  ngOnInit() { }

}
