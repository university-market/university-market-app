import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogDataModel, ConfirmDialogDefaultActions } from '../../models/confirm-dialog-data.model';

@Component({
  selector: 'app-base-confirm-dialog',
  templateUrl: './base-confirm-dialog.component.html',
  styleUrls: ['./base-confirm-dialog.component.scss'],
})
export class BaseConfirmDialogComponent implements OnInit {

  public question: string = null;
  public btnConfirm: string = null;
  public btnCancel: string = null;

  constructor (
    private dialogRef: MatDialogRef<BaseConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogDataModel
  ) {
    
    // Descricao a ser exibida no corpo da dialog
    this.question = data.question;

    // Texto que o botão de confirmar deverá exibir
    this.btnConfirm = data.confirmText ? 
      data.confirmText : ConfirmDialogDefaultActions.btnConfirm;

    // Texto que o botão de cancelar deverá exibir
    this.btnCancel = data.cancelText ? 
      data.cancelText : ConfirmDialogDefaultActions.btnCancel;
  }

  ngOnInit() { }

  public onConfirm = (): void => this.dialogRef.close(true);

  public onCancel = (): void => this.dialogRef.close(false);
}
