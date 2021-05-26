import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class PublicacaoFormService {

  constructor(private fb: FormBuilder) { }

}
