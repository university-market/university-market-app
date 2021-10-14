import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/base/services/dialog.service';
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

  ngOnInit() { }

  excluir(){
    this.onDelete.emit(this.publicacao.publicacaoId);
  }
  
}
