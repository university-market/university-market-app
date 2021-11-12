import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { KeyValuePair } from 'src/app/base/data-types/key-value-pair';
import { NotificationService } from 'src/app/base/services/notification.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-registro-instituicao-ensino-dialog',
  templateUrl: './registro-instituicao-ensino-dialog.component.html',
  styleUrls: ['./registro-instituicao-ensino-dialog.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class RegistroInstituicaoEnsinoDialogComponent implements OnInit {

  // Form
  public form: FormGroup;

  // Dados necessários para formulário
  public instituicaoList: KeyValuePair<number, string>[] = [];
  public cursosList$: Observable<KeyValuePair<number, string>[]> = null

  // Loading da dialog
  public loading$: Observable<boolean> = null;

  constructor (
    private service: RegisterService,
    private notification: NotificationService,
    private dialogRef: MatDialogRef<RegistroInstituicaoEnsinoDialogComponent>
  ) {
    
    // Loading
    this.loading$ = service.loading$;

    // Cursos preenchidos na service
    this.cursosList$ = this.service.cursos$;

    this.form = new FormGroup({
      instituicao: new FormControl(null, Validators.required),
      flagSemInstituicao: new FormControl(null),
      curso: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {

    // Listar todas as instituicoes
    this.service.buscarInstituicoes()
      .pipe()
      .subscribe(list => {

        this.instituicaoList = list;
      });

    // Listar todos os cursos padrão (inicialmente sem ter uma instituicao cadastrada)
    this.service.buscarCursosPadrao()
      .pipe()
      .subscribe();

    // Buscar cursos pela instituicao de ensino
    this.form.get('instituicao').valueChanges
      .pipe(
        // distinctUntilChanged(),
        switchMap(instituicaoId => {

          if (instituicaoId) {

            return this.service.buscarCursos(instituicaoId);
          }

          return this.service.buscarCursosPadrao();
        })
      )
      .subscribe();

    // Quando flag sem instituicao é marcada, desabilitar campo de instituicao
    this.form.get('flagSemInstituicao').valueChanges
      .subscribe(selected => {

        if (!selected) {
          this.form.get('instituicao').enable();
          return;
        }

        this.form.get('instituicao').patchValue(null, {onlySelf: true, emitEvent: true});
        this.form.get('instituicao').disable();
      })
  }

  public onConcluir(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      this.notification.error(`Para prosseguir com o cadastro, preencha todas as seções`, 2500);
      return;
    }

    // Flag - Sem instituição de ensino
    const semInstituicao = this.form.get('flagSemInstituicao').value;

    const instituicaoId: number|null = semInstituicao ? null : this.form.get('instituicao')?.value;
    const cursoId: number = this.form.get('curso')?.value;

    if (cursoId == null || (!semInstituicao && instituicaoId == null)) {

      this.form.markAllAsTouched();
      this.notification.error('O formulário deve ser preenchido corretamente');
      return;
    }

    const model = {
      instituicaoId: instituicaoId,
      cursoId: cursoId
    };

    this.dialogRef.close(model);
  }

  
}
