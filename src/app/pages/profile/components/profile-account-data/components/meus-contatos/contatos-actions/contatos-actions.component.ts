import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private profile: ProfileService,
    private dialogRef : MatDialogRef<ContatosActionsComponent>  

  ) {
    this.form = new FormGroup({
      tipoContato : new FormControl(null,[Validators.required]),
      valor       : new FormControl(null)
    });
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

  cadastrar(){

    if(this.form.invalid){
      this.notification.error('Favor informar um contato válido')
      return;
    }
    const model: MeusContatosModel = {
      estudante_id: this.authService.user.usuarioId,
      conteudo: this.form.get('valor')?.value,
      tipo_contato_id: this.form.get('tipoContato')?.value

    }

    if (!model.conteudo || !model.tipo_contato_id) {
      
      this.form.markAllAsTouched();

      this.notification.error("Todos os campos são obrigatórios");
      return;
    }

    this.dialogRef.close(model);
  }

}
