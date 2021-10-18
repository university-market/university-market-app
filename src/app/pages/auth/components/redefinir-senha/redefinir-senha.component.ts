import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { NotificationService } from 'src/app/base/services/notification.service';
import { PASSWORD_MAXLENGHT, PASSWORD_MINLENGHT } from 'src/app/core/static/password-data';
import { RedefinicaoSenhaService } from '../../services/redefinicao-senha.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss'],
  providers: [RedefinicaoSenhaService]
})
export class RedefinirSenhaComponent implements OnInit {

  public onSuccess$ = new BehaviorSubject<boolean>(false);

  public formValidacaoEmail: FormGroup;
  public emailCompleted: boolean = false;
  public emailNaoValidado: boolean = false;

  public formRedefinicaoSenha: FormGroup;
  private _senhaValidators = [
    Validators.minLength(PASSWORD_MINLENGHT),
    Validators.maxLength(PASSWORD_MAXLENGHT)
  ];

  public invalid$ = new BehaviorSubject<boolean>(false);

  private _triedSave = new BehaviorSubject<boolean>(false);
  public triedSave$ = this._triedSave.asObservable();

  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  constructor(
    private service: RedefinicaoSenhaService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formValidacaoEmail = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });

    this.formRedefinicaoSenha = new FormGroup({
      senha: new FormControl(null, [Validators.required, ...this._senhaValidators]),
      confirmacaoSenha: new FormControl(null, [Validators.required, ...this._senhaValidators])
    });
  }

  ngOnInit() {
    
    this.route.paramMap
      .subscribe((p) => {

        const token = p.get('token');

        if (token) {

          this.service.init(token);
        }
      });
  }

  public onValidarEmail(): void {

    const email = this.formValidacaoEmail.get('email')?.value;

    if (this.formValidacaoEmail.invalid || !email) {

      this._triedSave.next(true);
      this.formValidacaoEmail.markAllAsTouched();

      const msg = email ? 'Um e-mail válido deve ser informado' : 'Você deve informar seu e-mail';
      this.notification.error(msg);

      return;
    }

    // Request para validar email
    this.service.autenticarSolicitacaoPorEmail(email)
      .pipe(
        catchError(err => {

          this._markEmailAsInvalid();

          throw err;
        })
      )
      .subscribe(res => {

        if (res) {

          if (this._triedSave.getValue()) // Reset tentativa de salvar
            this._triedSave.next(false);

          if (this.invalid$.getValue()) // Reset status invalido
            this.invalid$.next(false);

          // Notificar sucesso da validação
          this.notification.success('Verificamos sua solicitação e está tudo certo');

          this.emailCompleted = true;
          this.emailNaoValidado = false;
          this.stepper.next();

          return;
        }

        this._markEmailAsInvalid(true);
      });
  }

  public onAlterarSenha(): void {

    const novaSenha = this.formRedefinicaoSenha.get('senha')?.value;
    const confirmacao = this.formRedefinicaoSenha.get('confirmacaoSenha')?.value;

    if (novaSenha != confirmacao) {

      this.formRedefinicaoSenha.get('senha').reset();

      this.formRedefinicaoSenha.markAllAsTouched();
      this.formRedefinicaoSenha.updateValueAndValidity();

      this.notification.error('A nova senha e a confirmação devem ser iguais');

      this._triedSave.next(true);
      return;
    }

    if (this.formRedefinicaoSenha.invalid || !novaSenha) {

      this._triedSave.next(true);

      this.formRedefinicaoSenha.reset();
      this.formRedefinicaoSenha.markAllAsTouched();

      const msg = novaSenha ? 'A senha deve atender aos requisitos apresentados' : 'Uma senha válida deve ser informada';
      this.notification.error(msg);

      return;
    }

    this.service.alterarSenha(novaSenha)
      .pipe(
        filter(r => {

          if (!r) {

            this.notification.warn('Um e-mail válido deve ser devidamente informado');
            this.stepper.previous();

            this.invalid$.next(false);
            this.emailCompleted = false;
            this.emailNaoValidado = true;

            return false;
          }
          return true;
        }),
        catchError(err => {

          this._triedSave.next(true);
          this.invalid$.next(true);

          this.formRedefinicaoSenha.reset();
          this.formRedefinicaoSenha.markAllAsTouched();

          throw err;
        })
      )
      .subscribe(() => {

        this.onSuccess$.next(true);

        this.notification.success('Sucesso! Sua solicitação foi concluída');
      });
  }

  // Private methods

  private _markEmailAsInvalid(showMessage: boolean = false) {

    if (!this.invalid$.getValue())
      this.invalid$.next(true);

    this.formValidacaoEmail.get('email').reset();

    if (!this._triedSave.getValue())
      this._triedSave.next(true);

    this.formValidacaoEmail.get('email').markAsTouched();
    this.formValidacaoEmail.get('email').updateValueAndValidity();

    if (showMessage)
      this.notification.error('Este e-mail não corresponde à uma solicitação válida');
  }

}
