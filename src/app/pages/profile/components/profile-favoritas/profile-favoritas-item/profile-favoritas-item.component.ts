import { Component, Input, OnInit, Output, EventEmitter,} from '@angular/core';
import { ProfilePublicacoesModel } from '../../../models/profile-publicacaoes.model';

@Component({
  selector: 'app-profile-favoritas-item',
  templateUrl: './profile-favoritas-item.component.html',
  styleUrls: ['./profile-favoritas-item.component.scss']
})
export class ProfileFavoritasItemComponent implements OnInit {

  @Input('publicacao') publicacao: ProfilePublicacoesModel; 

  @Output('onDelete') onDelete = new EventEmitter<number>();


  constructor(
  ) { }

  ngOnInit() { }

  excluir(){
    this.onDelete.emit(this.publicacao.publicacaoId);
  }

}
