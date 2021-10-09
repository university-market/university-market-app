import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseConfirmDialogComponent } from '../components/base-confirm-dialog/base-confirm-dialog.component';
import { ConfirmDialogDataModel } from '../models/confirm-dialog-data.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _baseConfig: MatDialogConfig = {
    width: '400px',
    maxWidth: '90%'
  };

  constructor(private dialog: MatDialog) { }

  public openConfirmDialog(question: string, confirmText?: string, cancelText?: string): Observable<boolean> {

    const dataModel: ConfirmDialogDataModel = {
      question,
      confirmText,
      cancelText
    };

    return this.dialog
      .open(BaseConfirmDialogComponent, {...this._baseConfig, data: dataModel})
      .afterClosed()
      .pipe(
        map(r => r as boolean)
      );
  }

}
