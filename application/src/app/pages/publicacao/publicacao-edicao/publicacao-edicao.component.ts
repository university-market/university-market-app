import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { MASKS } from 'ng-brazil';
import { PublicacaoFormService } from '../services/publicacao-form.service';
import { PublicacaoService } from '../services/publicacao.service';
import { PublicacaoTag } from '../models/publicacao-tag.model';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { PublicacaoCriacaoModel } from '../models/publicacao-criacao.model';

@Component({
  selector: 'app-publicacao-edicao',
  templateUrl: './publicacao-edicao.component.html',
  styleUrls: ['./publicacao-edicao.component.scss']
})
export class PublicacaoEdicaoComponent implements OnInit {

  public form: FormGroup;
  public MASKS = MASKS;

  // Validacao do formulario
  private _warned: boolean = false;

  // Descricao
  public descricaoMaxLength = 256;

  // Tags
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public tags: PublicacaoTag[] = [];

  // Imagem
  public imagePath: string;
  public message: string|null;
  public imgURL: any;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private formService: PublicacaoFormService,
    public service: PublicacaoService,
    private snackbar: SnackBarService
  ) { }

  ngOnInit() {

    this.route.paramMap
    .pipe(
      take(1),
      switchMap((p: Params) => {
        const publicacaoId = +p.get('publicacaoId');
  
        return this.service.init(publicacaoId);
      }),
      filter(p => p != null)
    )
    .subscribe(publicacao => {
      console.log(publicacao);
      this.patchValue(publicacao);
    },
    error => {
      this.snackbar.error(error.error.message);
      this.router.navigate(['../']);
    });

    this.form = this.formService.criarForm();
  }

  public patchValue(publicacao: PublicacaoCriacaoModel) {

    if (publicacao.tags)
      this.tags = this._makeTagsArray(publicacao.tags);

    this.form.patchValue({
      titulo: publicacao.titulo,
      descricao: publicacao.descricao,
      valor: this._makeValor(publicacao.valor)
    });
  }

  private _makeValor(valor: number|string): number | string {
    console.log(valor);
    return typeof valor === 'string' ? 
      parseFloat(valor.toString().replace(',', '.')) : 
      valor.toString().replace('.', ',');
  }

  private _makeTagsString = (tags: PublicacaoTag[]) => tags ? tags.map<string>(t => (t.name)).join(',') : null;

  private _makeTagsArray = (tags: string) => tags ? tags.split(',').map<PublicacaoTag>(t => ({ name: t.trim() })) : null;

  public criar() {

    if (!this.form.valid) {
      if(!this._warned) {
        this._warned = true;
        this.form.markAllAsTouched();
        this.snackbar.error('Campos obrigatórios devem ser preenchidos');
      }
      return;
    }

    const model: PublicacaoCriacaoModel = {
      titulo: this.form.get('titulo').value,
      descricao: this.form.get('descricao').value,
      valor: <number>this._makeValor(this.form.get('valor').value),
      tags: this._makeTagsString(this.tags)
    };

    const msg = 'Publicacao criada';

    this.snackbar.success(msg);
    console.log(msg, model);
  }

  public editar() {

    if (!this.form.valid) {
      if(!this._warned) {
        this._warned = true;
        this.form.markAllAsTouched();
        this.snackbar.error('Campos obrigatórios devem ser preenchidos');
      }
      return;
    }

    const model: PublicacaoCriacaoModel = {
      titulo: this.form.get('titulo').value,
      descricao: this.form.get('descricao').value,
      valor: <number>this._makeValor(this.form.get('valor').value),
      tags: this._makeTagsString(this.tags)
    };

    const msg = 'Publicacao editada';

    this.snackbar.success(msg);
    console.log(msg, model);
  }

  public addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value)
      this.tags.push({name: event.value});

    event.input.value = '';
  }

  public removeTag(tag: PublicacaoTag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0)
      this.tags.splice(index, 1);
  }

  public preview(files: any) {

    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      let msg = "Somente imagens são suportadas";
      this.message = msg;
      this.snackbar.warn(msg);
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    this.message = null;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => this.imgURL = reader.result;
  }

}
