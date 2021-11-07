import { Component, Input, OnInit } from '@angular/core';
import { MeusDadosUserModel } from 'src/app/pages/profile/models/meus-dados-user.model';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss']
})
export class MeusDadosComponent implements OnInit {

  @Input() user: MeusDadosUserModel;

  constructor() { }

  ngOnInit() {
  }

}
