import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { BehaviorSubject } from 'rxjs';
import { filter, finalize, switchMap, take } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { MASKS } from 'ng-brazil';
import { PublicacaoFormService } from '../services/publicacao-form.service';
import { PublicacaoService } from '../services/publicacao.service';
import { PublicacaoTag } from '../models/publicacao-tag.model';
import { PublicacaoCriacaoModel } from '../models/publicacao-criacao.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotificationService } from 'src/app/base/services/notification.service';
import { DialogService } from 'src/app/base/services/dialog.service';

@UntilDestroy()
@Component({
  selector: 'app-publicacao-edicao',
  templateUrl: './publicacao-edicao.component.html',
  styleUrls: ['./publicacao-edicao.component.scss'],
  providers: [
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS, 
      useValue: { 
        clickAction: 'noop' 
      } as MatCheckboxDefaultOptions
    }
  ]
})
export class PublicacaoEdicaoComponent implements OnInit {

  public form: FormGroup;
  public MASKS = MASKS;

  // Salvamento dos dados
  public loadingEdicao$ = this.service.loadingEdicao$;

  // Validacao do formulario
  private _warned: boolean = false;
  public triedSave = false; // Utilizado no disable de salvar

  // Descricao
  public readonly descricaoMaxLength = 256;

  // Tags
  public readonly maxLengthTags: number = 12;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public tags: PublicacaoTag[] = [];

  // Detalhes tecnicos
  public readonly especificacoesTecnicasMaxLength = 256;
  private _hasEspecificacoesTecnicas = new BehaviorSubject<boolean>(false);
  public hasEspecificacoesTecnicas$ = this._hasEspecificacoesTecnicas.asObservable();

  // Imagem
  public imagePath: string;
  public message: string|null;
  public imgURL: any;
  public selectedImage: any;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formService: PublicacaoFormService,
    public service: PublicacaoService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private dialogService: DialogService
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
      this._hasEspecificacoesTecnicas.next(publicacao.especificacoesTecnicas != null);
      this.patchValue(publicacao as PublicacaoCriacaoModel);
    },
    () => this.location.back());

    this.form = this.formService.criarForm();
  }

  public patchValue(publicacao: PublicacaoCriacaoModel) {

    if (publicacao.tags)
      this.tags = this.service.makeTagsArray(publicacao.tags);

    this.form.patchValue({
      titulo: publicacao.titulo,
      descricao: publicacao.descricao,
      valor: this._makeValor(publicacao.valor),
      especificacoesTecnicas: publicacao.especificacoesTecnicas
    });
  }

  private _makeValor(valor: number|string): number | string {
    return typeof valor === 'number' ? 
    valor.toFixed(2).toString().replace('.', ',') : isNaN(parseFloat(valor.toString())) ? 
      parseFloat(valor.toString().substr(3).replace('.','').replace(',', '.')) : 
      parseFloat((valor).toString().replace(',','.'));
  }

  

  // Metodo utilizado para cancelar a criacao/edicao
  public onCancel = () => this.location.back();

  // Metodo chamado ao criar publicacao
  public criar() {

    if (!this._isValidSubmit())
      return;

    const model: PublicacaoCriacaoModel = {
      titulo: this.form.get('titulo').value,
      descricao: this.form.get('descricao').value,
      valor: <number>this._makeValor(this.form.get('valor').value),
      tags: this.service.makeTagsString(this.tags),
      especificacoesTecnicas: this.form.get('especificacoesTecnicas').value ?? null,
      // pathImagem: this.selectedImage
    };

    // Metodo de criar no back-end
    this.service.criar(model)
    .pipe(
      take(1),
      switchMap(id => this.service.uploadImage(id, this.selectedImage))
    ).subscribe((publicacaoId) => {
      
      this.notification.success('Publicação criada com sucesso');
      // Navegar para pagina de detalhes da publicacao
      this.router.navigate(['publicacao', publicacaoId], { relativeTo: this.route.root });
    });
  }

  // Metodo chamado ao editar publicacao
  public editar() {

    if (!this._isValidSubmit())
      return;

    const model: PublicacaoCriacaoModel = {
      titulo: this.form.get('titulo').value,
      descricao: this.form.get('descricao').value,
      valor: <number>this._makeValor(this.form.get('valor').value),
      tags: this.service.makeTagsString(this.tags),
      especificacoesTecnicas: this.form.get('especificacoesTecnicas').value
    };

    // Metodo de editar no back-end
    this.service.publicacao$
    .pipe(
      take(1),
      untilDestroyed(this),
      switchMap(publicacao => this.service.editar(publicacao.publicacaoId, model)),
    )
    .subscribe((publicacao) => {
      this.notification.success('Publicação editada com sucesso');
      // Navegar para pagina de detalhes da publicacao
      this.router.navigate(['publicacao', publicacao.publicacaoId ], { relativeTo: this.route.root });
    });
  }

  private _isValidSubmit() {

    if (!this.form.valid) {
      this.triedSave = true;
      if(!this._warned) {
        this._warned = true;
        this.form.markAllAsTouched();
        this.notification.error('Existem campos obrigatórios');
      }
      return false;
    }
    return true;
  }

  // Manipulacao de tags
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

  // Manipulacao imagem
  public preview(files: any) {

    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      let msg = "Somente imagens são suportadas";
      this.message = msg;
      this.notification.warn(msg);
      return;
    }

    // Salvando a imagem em memória para enviar para API
    this.selectedImage = files[0];
 
    var reader = new FileReader();
    this.imagePath = files;
    this.message = null;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => this.imgURL = reader.result;

    // this.service.uploadImage(files[0])
    // .subscribe(() => this.notification.notify('Sua imagem foi carregada com sucesso'));
  }

  // Manipulacao detalhes (ambiente de testes)
  public onBlurFn(event: any): void {

    const lorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos non similique molestiae culpa pariatur repellendus tempora';
    if (event.target.value == 'lorem')
      this.form.get('descricao').setValue(lorem);
  }

  // Manipulacao detalhes tecnicos
  public changeEspecificacoesTecnicas(): void {

    const hasDetails = this._hasEspecificacoesTecnicas.getValue();
    const especificacoesTecnicasRef = this.form.get('especificacoesTecnicas') as FormControl;

    if (hasDetails) {

      if (especificacoesTecnicasRef.value) {

        const message = `Ao desmarcar esta opção, as especificações técnicas cadastradas serão excluídas. Deseja continuar?`;
        this.dialogService.openConfirmDialog(message)
          .pipe(
            filter(res => res)
          )
          .subscribe(() => {
            
            especificacoesTecnicasRef.reset(); // Reset do campo de detalhes tecnicos
  
            especificacoesTecnicasRef.clearValidators();
            this.notification.warn('Especificações técnicas apagadas');
            this._changeEspecificacoesTecnicas(!hasDetails);
          });
      }
      else {

        especificacoesTecnicasRef.clearValidators();
        this._changeEspecificacoesTecnicas(!hasDetails);
      }

    } else {

      especificacoesTecnicasRef.reset(); // Reset do campo de detalhes tecnicos

      especificacoesTecnicasRef.setValidators(Validators.required);
      this._changeEspecificacoesTecnicas(!hasDetails);
    }
  }

  private _changeEspecificacoesTecnicas(value: boolean) {

    // Salvar alteracoes de validators
    (this.form.get('especificacoesTecnicas') as FormControl).updateValueAndValidity();

    this._hasEspecificacoesTecnicas.next(value);
  }

}
