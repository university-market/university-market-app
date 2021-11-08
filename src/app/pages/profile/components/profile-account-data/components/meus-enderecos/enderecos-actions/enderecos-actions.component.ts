import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/base/services/notification.service';
import { MeusEnderecosModel } from 'src/app/pages/profile/models/meus-enderecos.model';

@Component({
  selector: 'app-enderecos-actions',
  templateUrl: './enderecos-actions.component.html',
  styleUrls: ['./enderecos-actions.component.scss']
})
export class EnderecosActionsComponent implements OnInit {

  public isEdicao = false;
  public form: FormGroup;

  constructor(
    private notification: NotificationService,
    private dialogRef : MatDialogRef<EnderecosActionsComponent>,
  ) { 
    this.form = new FormGroup({
      rua         : new FormControl(null,[Validators.required]),
      numero      : new FormControl(null,[Validators.required]),
      cep         : new FormControl(null,[Validators.required]),
      complemento : new FormControl(null),
    })
  }

  ngOnInit() {
  }

  validar(){
    if(this.form.invalid){
      this.notification.error('Favor informar os campos obrigatórios!')
      return false;
    }
    return true;
  }

  cadastrar(){
    if(!this.validar()){
      return;
    }

    const model: MeusEnderecosModel = {
      rua: this.form.get('rua')?.value,
      numero: this.form.get('numero')?.value,
      cep: this.form.get('cep')?.value,
      complemento: this.form.get('complemento')?.value,
    }
    // console.log(model);
    this.dialogRef.close(model);
  }
}
