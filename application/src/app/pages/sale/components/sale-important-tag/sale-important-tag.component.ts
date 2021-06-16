import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-important-tag',
  templateUrl: './sale-important-tag.component.html',
  styleUrls: ['./sale-important-tag.component.scss']
})
export class SaleImportantTagComponent implements OnInit {

  @Input('label') label: string = '';
  @Input('color') color: string = 'default';

  constructor() { }

  ngOnInit() {
  }

}
