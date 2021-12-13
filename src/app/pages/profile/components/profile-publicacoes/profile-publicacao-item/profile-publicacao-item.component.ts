import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfilePublicacoesModel } from '../../../models/profile-publicacaoes.model';

@Component({
  selector: 'app-profile-publicacao-item',
  templateUrl: './profile-publicacao-item.component.html',
  styleUrls: ['./profile-publicacao-item.component.scss']
})
export class ProfilePublicacaoItemComponent implements OnInit {

  @Input('publicacao') publicacao: ProfilePublicacoesModel; 

  @Output('onDelete') onDelete = new EventEmitter<number>();

  @Output('onVendida') onVendida = new EventEmitter<ProfilePublicacoesModel>();

  constructor(
  ) { }

  ngOnInit() { }

  excluir(){
    this.onDelete.emit(this.publicacao.publicacaoId);
  }

  marcarVendida(publicacao: ProfilePublicacoesModel){
    this.onVendida.emit(publicacao);
  }
  
}
