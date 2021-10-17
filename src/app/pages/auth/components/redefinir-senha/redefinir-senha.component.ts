import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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

  public formValidacaoEmail: FormGroup;
  public emailCompleted: boolean = false;

  public formRedefinicaoSenha: FormGroup;
  private _senhaValidators = [
    Validators.minLength(PASSWORD_MINLENGHT),
    Validators.maxLength(PASSWORD_MAXLENGHT)
  ];

  private _triedSave = new BehaviorSubject<boolean>(false);
  public triedSave$ = this._triedSave.asObservable();

  @ViewChild('stepper', {static: true}) stepper: MatStepper;

  constructor(
    private notification: NotificationService,
    private route: Router
  ) {
    this.formValidacaoEmail = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });

    this.formRedefinicaoSenha = new FormGroup({
      senha: new FormControl(null, [Validators.required, ...this._senhaValidators]),
      confirmacaoSenha: new FormControl(null, [Validators.required, ...this._senhaValidators])
    });
  }

  ngOnInit() { }

  onValidarEmail(): void {

    const email = this.formValidacaoEmail.get('email')?.value;

    if (this.formValidacaoEmail.invalid || !email) {

      this._triedSave.next(true);
      this.formValidacaoEmail.markAllAsTouched();

      const msg = email ? 'Um e-mail válido deve ser informado' : 'Você deve informar seu e-mail';
      this.notification.error(msg);

      return;
    }

    // Request para validar email

    if (this._triedSave.getValue())
      this._triedSave.next(false);

    this.emailCompleted = true;
    this.stepper.next();
  }

}
