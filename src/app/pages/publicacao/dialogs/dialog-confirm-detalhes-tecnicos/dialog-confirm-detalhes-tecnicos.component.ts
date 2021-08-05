import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-detalhes-tecnicos',
  templateUrl: './dialog-confirm-detalhes-tecnicos.component.html',
  styleUrls: ['./dialog-confirm-detalhes-tecnicos.component.scss']
})
export class DialogConfirmDetalhesTecnicosComponent implements OnInit {

  constructor (
    private dialogRef: MatDialogRef<DialogConfirmDetalhesTecnicosComponent>
  ) { }

  ngOnInit() { }

  public confirmarExclusao = () => this.fechar(true);

  public fechar(value: boolean = false) {
    this.dialogRef.close(value);
  }
}
