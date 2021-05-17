import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private dialog: MatDialog,
              private snackBar : SnackBarService,
              private loginService: LoginService,
              private route: Router) {}

  ngOnInit(): void {
    this.login = new FormGroup({
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required]),
    })
  }

  // Função Responsável por realizar o login do usuário
  doLogin(){
    const model: LoginModel = {
      email: this.login.get('email')?.value,
      password: this.login.get('password')?.value,
    }

    // Validação dos campos de login
    if(model.email && model.password){
      this.loginService.doLogin(model).subscribe(() =>{
        this.snackBar.show("Login Realizado com sucesso", 3000, 'msg-success'),
        this.route.navigate(['/'])
      })
    }else{
      this.snackBar.show("Favor preencher todos os campos!", 3000, 'msg-error');
      return
    }
  }

  //Função responsável por abrir o modal de recuperação de senha
  forgot(){
    this.dialog.open(ForgotPasswordComponent);
  }

}
