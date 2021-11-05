import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/base/services/dialog.service';
import { MeusDadosUserModel } from 'src/app/pages/profile/models/meus-dados-user.model';
import { MeusDadosEditarComponent } from './meus-dados-editar/meus-dados-editar.component';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss']
})
export class MeusDadosComponent implements OnInit {

  @Input() user: MeusDadosUserModel;

  constructor(
    private dialog: MatDialog
    ){}

  ngOnInit() {
  }

  editar(){
    this.dialog.open(MeusDadosEditarComponent,{
      width : '500px',
      maxWidth: '80%'
    })
  }

}
