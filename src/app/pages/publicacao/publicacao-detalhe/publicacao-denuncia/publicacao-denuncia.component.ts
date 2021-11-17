import { Component, Inject, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/base/services/notification.service';
import { PublicacaoDenunciaModel } from '../../models/publicacao-denuncia.model';
import { PublicacaoDetalheModel } from '../../models/publicacao-detalhe.model';
import { PublicacaoDetalheComponent } from '../publicacao-detalhe.component';

@Component({
  selector: 'app-publicacao-denuncia',
  templateUrl: './publicacao-denuncia.component.html',
  styleUrls: ['./publicacao-denuncia.component.scss']
})
export class PublicacaoDenunciaComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private notification: NotificationService,
    private dialogRef : MatDialogRef<PublicacaoDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PublicacaoDetalheModel
  ) { 
    this.form = new FormGroup({
      motivo : new FormControl(null,[Validators.required]),
      publicacao_id : new FormControl(null),
      estudande_denunciado_id : new FormControl(null),
    });
  }

  ngOnInit() {
  }

  validar(){
    if(this.form.invalid){
      this.notification.error('O motivo da denúncia é obrigatório')
      return false;
    }

    if (!this.form.get('motivo')?.value) {
      
      this.form.markAllAsTouched();

      this.notification.error("O motivo da denúncia é obrigatório");
      return false;
    }

    return true;
  }

  cadastrarDenuncia(){
    if(!this.validar()){
      return;
    }

    const model: PublicacaoDenunciaModel = {
      publicacao_id: this.data?.publicacaoId,
      motivo: this.form.get('motivo')?.value,
      estudante_id_denunciado: this.data?.estudanteId
    }

    this.dialogRef.close(model);
  }

}
