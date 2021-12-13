import { Component, Inject, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/base/services/notification.service';
import { PublicacaoDenunciaModel } from '../../models/publicacao-denuncia.model';
import { PublicacaoDetalheModel } from '../../models/publicacao-detalhe.model';
import { TipoDenunciaModel } from '../../models/tipos-denuncias-model';
import { DenunciaService } from '../../services/denuncia.service';
import { PublicacaoDetalheComponent } from '../publicacao-detalhe.component';

@Component({
  selector: 'app-publicacao-denuncia',
  templateUrl: './publicacao-denuncia.component.html',
  styleUrls: ['./publicacao-denuncia.component.scss']
})
export class PublicacaoDenunciaComponent implements OnInit {

  private _publicacaoId: number = 0;

  public form: FormGroup;
  denuncias: TipoDenunciaModel[] = [];

  public loading$: Observable<boolean> = null;

  constructor(
    private notification: NotificationService,
    private dialogRef : MatDialogRef<PublicacaoDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PublicacaoDetalheModel,
    private service: DenunciaService
  ) { 

    // Inicializacao loading da dialog
    this.loading$ = this.service.loading$;

    // Inicializacao publicacao
    this._publicacaoId = data?.publicacaoId;

    // Inicializacao form
    this.form = new FormGroup({
      motivo : new FormControl(null,[Validators.required]),
      publicacao_id : new FormControl(null),
      estudande_denunciado_id : new FormControl(null),
      tipo_denuncia_id: new FormControl(null,[Validators.required])
    });
  }

  ngOnInit() {

    this.service.obterTipoDenuncias()
      .subscribe( denuncias => {
        this.denuncias = denuncias;
      });
  }

  validar(): boolean {

    if (this.form.invalid) {
      this.notification.error("O motivo da denúncia é obrigatório");
      return false;
    }

    if (!this.form.get('motivo')?.value) {
      
      this.form.markAllAsTouched();

      this.notification.error("O motivo da denúncia é obrigatório");
      return false;
    }

    if (!this.form.get('tipo_denuncia_id')?.value) {

      this.notification.error("O problema da denúncia é obrigatório");
      return false;
    }

    return true;
  }

  public cadastrarDenuncia(): void {

    if(!this.validar()){
      return;
    }

    const model: PublicacaoDenunciaModel = {
      publicacao_id: this.data?.publicacaoId,
      motivo: this.form.get('motivo')?.value,
      estudante_id_denunciado: this.data?.estudanteId,
      tipo_denuncia_id: this.form.get('tipo_denuncia_id')?.value
    }

    this.service.denunciar(this._publicacaoId, model)
      .subscribe(() => {

        this.notification.success("Denúncia cadastrada com sucesso");
        this.dialogRef.close();
      });
  }

}
