import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-publicacoes-header',
  templateUrl: './profile-publicacoes-header.component.html',
  styleUrls: ['./profile-publicacoes-header.component.scss']
})
export class ProfilePublicacoesHeaderComponent implements OnInit {

  @Input() hasPublicacoes: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
