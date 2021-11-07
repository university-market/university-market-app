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
      descricao: this.fb.control(null),
      // tags: this.fb.control(null),
      valor: this.fb.control(null, [NgBrazilValidators.currency]),
      especificacoesTecnicas: this.fb.control(null),
      imagem: this.fb.control(null)
    });
  }

}
