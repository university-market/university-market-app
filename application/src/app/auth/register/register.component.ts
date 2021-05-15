import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  constructor() { }

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
    // Validação de senha, verificando se as mesmas são iguais
    if(model.password != password_validator){
      alert('As senhas não condizem')
    }else{
    console.log(model)
    }
  }
}
