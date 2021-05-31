import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { PublicacaoFormService } from '../services/publicacao-form.service';
import { PublicacaoService } from '../services/publicacao.service';
import { MASKS } from 'ng-brazil';
@Component({
  selector: 'app-publicacao-edicao',
  templateUrl: './publicacao-edicao.component.html',
  styleUrls: ['./publicacao-edicao.component.scss']
})
export class PublicacaoEdicaoComponent implements OnInit {

  public form: FormGroup;

  public MASKS = MASKS;

  public descricaoMaxLength = 256;

  constructor(
    private route: ActivatedRoute,
    private formService: PublicacaoFormService,
    public service: PublicacaoService,
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

}
