import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private dialog: MatDialog,
              private snackBar : SnackBarService) {
      
   }

  ngOnInit(): void {
    this.login = new FormGroup({
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required]),
    })
  }

  doLogin(){
    const model: LoginModel = {
      email: this.login.get('email')?.value,
      password: this.login.get('password')?.value,
    }

    // Validação dos campos de login
    if(!model.email || !model.password){
      this.snackBar.show("Favor preencher todos os campos!",3000, 'msg-error');
      return
    }
  }

  forgot(){
    this.dialog.open(ForgotPasswordComponent);
  }

}
