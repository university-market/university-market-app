import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { AuthService } from 'src/app/base/services/auth.service';
import { NotificationService } from 'src/app/base/services/notification.service';
import { MeusContatosModel } from 'src/app/pages/profile/models/meus-contatos.model';
import { ProfileService } from 'src/app/pages/profile/services/profile.service';

@Component({
  selector: 'app-contatos-actions',
  templateUrl: './contatos-actions.component.html',
  styleUrls: ['./contatos-actions.component.scss']
})
export class ContatosActionsComponent implements OnInit {

  public form: FormGroup;
  public MASKS = MASKS;
  public isEdicao = false;
  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private profile: ProfileService,
    private dialogRef : MatDialogRef<ContatosActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MeusContatosModel
  ) {
    this.form = new FormGroup({
      tipoContato : new FormControl(null,[Validators.required]),
      valor       : new FormControl(null)
    });
    if(this.data){
      this.isEdicao = true;
      this.form.patchValue({
        tipoContato: this.data?.tipo_contato_id,
        valor: this.data?.conteudo
      })
    }

  }

  ngOnInit() {
    this.form.get('tipoContato').valueChanges
      .subscribe(value => {
        if(value == 4){
          this.form.get('valor').reset()
          this.form.get('valor').clearValidators();
          this.form.get('valor').setValidators(Validators.email);
        }
        else{
          this.form.get('valor').reset()
          this.form.get('valor').clearValidators();
          this.form.get('valor').setValidators(NgBrazilValidators.telefone);
        }
        this.form.get('valor').updateValueAndValidity();
      })
  }

  validar(){
    if(this.form.invalid){
      this.notification.error('Favor informar um contato válido')
      return false;
    }

    if (!this.form.get('valor')?.value || !this.form.get('tipoContato')?.value) {
      
      this.form.markAllAsTouched();

      this.notification.error("Todos os campos são obrigatórios");
      return false;
    }

    return true;
  }

  cadastrar(){

    if(!this.validar()){
      return;
    }
    const model: MeusContatosModel = {
      conteudo: this.form.get('valor')?.value,
      tipo_contato_id: this.form.get('tipoContato')?.value
    }

    this.dialogRef.close(model);
  }

  editar(){

    if(!this.validar()){
      return;
    }
    const model: MeusContatosModel = {
      id: this.data?.id,
      conteudo: this.form.get('valor')?.value,
      tipo_contato_id: this.form.get('tipoContato')?.value
    }

    this.dialogRef.close(model);
  }

}
