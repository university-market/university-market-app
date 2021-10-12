import { Component, Input, OnInit } from '@angular/core';
import { PublicacaoListagemModel } from 'src/app/pages/publicacao/models/publicacao-listagem.model';

@Component({
  selector: 'app-profile-publicacao-item',
  templateUrl: './profile-publicacao-item.component.html',
  styleUrls: ['./profile-publicacao-item.component.scss']
})
export class ProfilePublicacaoItemComponent implements OnInit {

  @Input('publicacao') publicacao: PublicacaoListagemModel; 

  constructor() { }

  ngOnInit() { }

}
