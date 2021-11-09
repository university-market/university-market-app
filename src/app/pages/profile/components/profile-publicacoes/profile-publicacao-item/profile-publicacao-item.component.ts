import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicacaoListagemModel } from 'src/app/pages/publicacao/models/publicacao-listagem.model';

@Component({
  selector: 'app-profile-publicacao-item',
  templateUrl: './profile-publicacao-item.component.html',
  styleUrls: ['./profile-publicacao-item.component.scss']
})
export class ProfilePublicacaoItemComponent implements OnInit {

  @Input('publicacao') publicacao: PublicacaoListagemModel; 

  @Output('onDelete') onDelete = new EventEmitter<number>();

  constructor(
  ) { }

  ngOnInit() {}

  excluir(){
    this.onDelete.emit(this.publicacao.publicacaoId);
  }
  
}
