import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/base/services/notification.service';
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

  constructor(
    private dialog: MatDialog,
    private notification: NotificationService,
    private loginService: LoginService,
    private route: Router
  ) {}

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
        this.notification.success("Login Realizado com sucesso"),
        this.route.navigate(['/'])
      })
    }else{
      this.notification.error("Favor preencher todos os campos!");
      return
    }
  }

  //Função responsável por abrir o modal de recuperação de senha
  forgot(){
    this.dialog.open(ForgotPasswordComponent);
  }

}
