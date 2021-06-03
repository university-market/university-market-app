import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { MASKS } from 'ng-brazil';
import { PublicacaoFormService } from '../services/publicacao-form.service';
import { PublicacaoService } from '../services/publicacao.service';
import { PublicacaoTag } from '../models/publicacao-tag.model';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
@Component({
  selector: 'app-publicacao-edicao',
  templateUrl: './publicacao-edicao.component.html',
  styleUrls: ['./publicacao-edicao.component.scss']
})
export class PublicacaoEdicaoComponent implements OnInit {

  public form: FormGroup;
  public MASKS = MASKS;

  // Descricao
  public descricaoMaxLength = 256;

  // Tags
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public tags: PublicacaoTag[] = [];

  // Imagem
  public imagePath: string;
  public message: string|null;
  public imgURL: any;

  constructor(
    private route: ActivatedRoute,
    private formService: PublicacaoFormService,
    public service: PublicacaoService,
    private snackbar: SnackBarService
  ) { }

  ngOnInit() {

    this.route.paramMap
    .pipe(
      take(1),
    )
    .subscribe((p: Params) => {
      const publicacaoId = +p.get('publicacaoId');

      this.service.init(publicacaoId);
    });

    this.form = this.formService.criarForm();
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value)
      this.tags.push({name: event.value});

    event.input.value = '';
  }

  removeTag(tag: PublicacaoTag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0)
      this.tags.splice(index, 1);
  }

  preview(files: any) {

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
