import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private dialog: MatDialog) {
      
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
    console.log(model)
  }

  forgot(){
    this.dialog.open(ForgotPasswordComponent);
  }

}
