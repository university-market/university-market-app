import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
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

  public form: FormGroup;

  public hidePassword: boolean = true;

  private _triedLogin = new BehaviorSubject<boolean>(false);
  public triedLogin$ = this._triedLogin.asObservable();

  private _incorrectLogin = new BehaviorSubject<boolean>(false);
  public incorrectLogin$ = this._incorrectLogin.asObservable();

  constructor(
    private dialog: MatDialog,
    private notification: NotificationService,
    private loginService: LoginService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email : new FormControl(null,[Validators.required,Validators.email]),
      senha : new FormControl(null,[Validators.required]),
    });
  }

  // Função Responsável por realizar o login do usuário
  doLogin() {

    const model: LoginModel = {
      email: this.form.get('email')?.value,
      senha: this.form.get('senha')?.value,
    }

    if (!model.email || !model.senha) {
      
      this.form.markAllAsTouched();
      this._triedLogin.next(true);

      this.notification.error("Todos os campos são obrigatórios");
      return;
    }
    
    this.loginService.doLogin(model)
      .pipe(
        catchError((error) => {

          this.form.reset();
          this.form.markAllAsTouched();

          this._incorrectLogin.next(true);

          return throwError(error);
        })
      )
      .subscribe((data) => {
        this.notification.notify('Seja bem-vindo, ' + data.nome);
        this.route.navigate(['/']); // Direcionar o usuário para homepage após autenticado
      });
  }

  // Função responsável por abrir o modal de recuperação de senha
  esqueci(): void{

    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '650px'
    });

    dialogRef.afterClosed()
      .pipe(
        filter(r => r != null && r)
      )
      .subscribe(email => {

        this.notification.notify('Um e-mail de redefinição foi enviado para: ' + email);
      });
  }

}
