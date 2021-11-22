import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoginModel } from 'src/app/base/models/auth/login.model';
import { AuthService } from 'src/app/base/services/auth.service';
import { NotificationService } from 'src/app/base/services/notification.service';
import { PASSWORD_MINLENGHT } from 'src/app/core/static/password-data';
import { RegistroInstituicaoEnsinoDialogComponent } from '../dialogs/registro-instituicao-ensino-dialog/registro-instituicao-ensino-dialog.component';
import { RegisterModel } from '../models/register.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  public form: FormGroup = null;
  public passwordMinLenght: number = PASSWORD_MINLENGHT;
  public triedSave$ = new BehaviorSubject<boolean>(false);

  constructor (
    private authService: AuthService,
    private notification: NotificationService,
    private registerService: RegisterService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.form = this.registerService.form;

    // Validacao inicial cadastro - Instituicao de ensino e Curso
    this.dialog.open(RegistroInstituicaoEnsinoDialogComponent, {
      disableClose: true,
      width: '950px',
    })
      .afterClosed()
      .pipe(
        map((data: {instituicaoId: number|null, cursoId: number}) => ({
          instituicaoId: data?.instituicaoId,
          cursoId: data?.cursoId
        }))
      )
      .subscribe(data => {

        // Inicializacao dados institucionais do estudante
        this.form.patchValue({
          instituicao: data.instituicaoId,
          curso: data.cursoId
        });
      });
  }

  // Função Responsável por realizar o cadatro do novo usuário
  public doRegister(): void {
    
    if (this.form.invalid) {
      console.log(this.form.getRawValue(), this.form);
      this.triedSave$.next(true);
      this.form.markAllAsTouched();
      this.notification.error('O formulário de cadastro deve ser preenchido corretamente', 3000);
      return;
    }

    const confirmacaoSenha: string = this.form.get('confirmacaoSenha')?.value;

    if (confirmacaoSenha?.trim() != (this.form.get('senha')?.value as string)?.trim()) {

      this.form.get('confirmacaoSenha').setErrors({invalid: true});
      this.notification.error('As senhas devem coincidir');
      return;
    } else {
      this.form.get('confirmacaoSenha').clearValidators();
    }

    const model: RegisterModel = {
      nome: this.form.get('nome').value,
      email: this.form.get('email').value,
      senha: this.form.get('senha').value,
      dataNascimento: this.form.get('dataNascimento').value,
      cursoId: this.form.get('curso').value,
      instituicaoId: this.form.get('instituicao').value
    };

    // Registrar estudante e fazer login automático
    this.registerService.doRegister(model)
      .pipe(
        switchMap(() => {
          
          this.notification.success('Seu cadastro foi realizado com sucesso');

          const modelLogin: LoginModel = {
            email: model.email,
            senha: model.senha
          };
          // Realizar login ao finalizar cadastro
          return this.authService.login(modelLogin)
        })
      )
      .subscribe((data) => {

        this.notification.notify('Seja bem-vindo, ' + data.nome);
        this.router.navigate(['/']); // Direcionar o usuário para homepage após autenticado
      });
  }
}
