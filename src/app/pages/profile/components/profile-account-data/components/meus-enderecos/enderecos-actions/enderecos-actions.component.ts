import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { convertMaskToPlaceholder } from 'js-brasil/src/mask';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
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
  public MASKS = MASKS;

  constructor(
    private notification: NotificationService,
    private dialogRef : MatDialogRef<EnderecosActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MeusEnderecosModel
  ) { 
    this.form = new FormGroup({
      rua         : new FormControl(null,[Validators.required]),
      numero      : new FormControl(null,[Validators.required]),
      cep         : new FormControl(null,[Validators.required,<any>NgBrazilValidators.cep]),
      complemento : new FormControl(null),
    })
    if(this.data){
      this.isEdicao = true;
      this.form.patchValue({
        rua: this.data?.rua,
        numero: this.data?.numero,
        cep: this.data?.cep,
        complemento: this.data?.complemento,
      })
    }
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

    model.cep = (model.cep as string).replace(/\D/g, '');

    this.dialogRef.close(model);
  }

  editar(){
    
    if(!this.validar()){
      return;
    }

    const model: MeusEnderecosModel = {
      id: this.data?.id,
      rua: this.form.get('rua')?.value,
      numero: this.form.get('numero')?.value,
      cep: this.form.get('cep')?.value,
      complemento: this.form.get('complemento')?.value,
    }

    this.dialogRef.close(model);

  }
}
