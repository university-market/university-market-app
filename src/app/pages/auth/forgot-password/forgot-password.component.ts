import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/base/services/notification.service';
import { ForgotModel } from '../models/forgot.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup

  public triedSave$ = new BehaviorSubject<boolean>(false);

  constructor (private ref: MatDialogRef<ForgotPasswordComponent>) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email])
    });
  }

  // Função para realizar a recuperação de senha
  doRecover(){

    const email = this.form.get('email')?.value;

    if(!email || this.form.invalid) {
      
      this.form.markAllAsTouched();
      this.triedSave$.next(true);

      return;
    }

    this.ref.close(email);
  }
}
