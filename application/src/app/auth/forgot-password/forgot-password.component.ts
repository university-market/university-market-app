import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ForgotModel } from '../models/forgot.model';
import { ForgotService } from '../services/forgot.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgot: FormGroup

  constructor(private snackBar: SnackBarService,
              private forgotService: ForgotService,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.forgot = new FormGroup({
      email : new FormControl(null,[Validators.required,Validators.email])
    })
  }
  //função para realizar a recuperação de senha
  doRecover(){
    const model: ForgotModel = { 
      email: this.forgot.get('email')?.value
    }

    if(!model.email){
      this.snackBar.show("E-mail é obrigatório",3000,'msg-error')
      return
    }else{
      this.forgotService.doRecover(model).subscribe(() => {
        this.snackBar.show("Link para recuperação de senha enviado ao e-mail",3000,'msg-success'),
        this.dialog.closeAll()
      })
    }
  }
}
