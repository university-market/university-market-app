import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeyValuePair } from 'src/app/base/data-types/key-value-pair';
import { NotificationService } from 'src/app/base/services/notification.service';
import { PASSWORD_MINLENGHT } from 'src/app/core/static/password-data';
import { RegisterModel } from '../models/register.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  public form: FormGroup = null;
  public passwordMinLenght: number = PASSWORD_MINLENGHT;
  public triedSave$ = new BehaviorSubject<boolean>(false);

  // Dados necessários para formulário
  public instituicaoList$: Observable<KeyValuePair<number, string>[]> = null;
  public cursosList$: Observable<KeyValuePair<number, string>[]> = null

  constructor(
    private notification: NotificationService,
    private registerService: RegisterService,
    private route: Router
    ) { }

  ngOnInit(): void {

    this.form = this.registerService.form;
    this.instituicaoList$ = this.registerService.instituicoes$;
    this.cursosList$ = this.registerService.cursos$;
  }

  // Função Responsável por realizar o cadatro do novo usuário
  public doRegister(): void {
    
    if (this.form.invalid) {
      
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
      ra: this.form.get('ra').value,
      telefone: this.form.get('telefone').value,
      senha: this.form.get('senha').value,
      dataNascimento: this.form.get('dataNascimento').value,
      cursoId: this.form.get('curso').value,
      instituicaoId: this.form.get('instituicao').value
    };

    // console.log('model is', model);
  }
}
