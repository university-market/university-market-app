import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-publicacoes',
  templateUrl: './profile-publicacoes.component.html',
  styleUrls: ['./profile-publicacoes.component.scss']
})
export class ProfilePublicacoesComponent implements OnInit {

  public publicacoesList = [];

  constructor() {
    
    this.publicacoesList.push(true);
    this.publicacoesList.push(true);
    this.publicacoesList.push(true);
    this.publicacoesList.push(true);
    this.publicacoesList.push(true);
  }

  ngOnInit() { }

}
