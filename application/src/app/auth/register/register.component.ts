import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { RegisterModel } from '../models/register.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  constructor(private snackBar: SnackBarService,
              private registerService: RegisterService,
              private route: Router) { }

  ngOnInit(): void {
    this.register = new FormGroup({
      name : new FormControl(null,[Validators.required]),
      email : new FormControl(null,[Validators.required,Validators.email]),
      date : new FormControl(null,[Validators.required]),
      password : new FormControl(null,[Validators.required,Validators.minLength(8)]),
      pass_confirm :new FormControl(null,[Validators.required,Validators.minLength(8)]),
    })
  }

  // Função Responsável por realizar o cadatro do novo usuário
  doRegister(){
    const password_validator = this.register.get('pass_confirm')?.value;
    const model: RegisterModel = {
      name: this.register.get('name')?.value,
      email: this.register.get('email')?.value,
      date: this.register.get('date')?.value,
      password: this.register.get('password')?.value,
    }
    
    if(!model.name || !model.email || !model.password || !model.date || !password_validator){
      //Validação dos campos de cadastro
      this.snackBar.show("Favor preencher todos os campos!",3000,'msg-error');
      return
    }else if(model.password != password_validator){
      // Validação de senha, verificando se as mesmas são iguais
      this.snackBar.show("Senhas divergentes",3000,'msg-error');
      return
    }else if (model.password.length < 8 || password_validator < 8){
      //Validação do tamanho das senhas
      this.snackBar.show("A Senha deve conter no mínimo 8 caracteres",3000,'msg-error')
    }else{
      this.registerService.doRegister(model).subscribe(() => {
        this.snackBar.show("Cadastro realizado com sucesso",3000,'msg-success'),
        this.route.navigate(['/'])
      })
    }
  }
}
