import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgBrazilValidators } from 'ng-brazil';

@UntilDestroy()
@Injectable()
export class PublicacaoFormService {

  constructor(private fb: FormBuilder) { }

  public criarForm(): FormGroup {

    return this.fb.group({
      titulo: this.fb.control(null),
      tags: this.fb.array([]),
      descricao: this.fb.control(null),
      valor: this.fb.control(null, [NgBrazilValidators.currency]),
      imagem: this.fb.control(null)
    })
  }

  public criarTag(value?: string): FormControl {

    return this.fb.control(value);
  }

}
