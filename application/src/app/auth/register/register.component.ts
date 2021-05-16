import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { RegisterModel } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  constructor(private snackBar: SnackBarService) { }

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
    
    //Validação dos campos de cadastro
    if(!model.name || !model.email || !model.password || !model.date || !password_validator){
      this.snackBar.show("Favor preencher todos os campos!",3000,'msg-error');
      return
    }

    // Validação de senha, verificando se as mesmas são iguais
    if(model.password != password_validator){
      this.snackBar.show("Senhas divergentes",3000,'msg-error');
      return
    }else{
      console.log(model)
    }
  }
}
