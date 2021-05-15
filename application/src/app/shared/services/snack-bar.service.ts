import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, duration: number, cssClass: string){
    this.snackBar.open(message ,'X', {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: cssClass
    });
  }
}