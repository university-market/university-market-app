import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { KeyValuePair } from 'src/app/base/data-types/key-value-pair';
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

  constructor(private service: RegisterService) {
    
    // Loading
    this.loading$ = service.loading$;

    // Cursos preenchidos na service
    this.cursosList$ = this.service.cursos$;

    this.form = new FormGroup({
      instituicao: new FormControl(null),
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
        distinctUntilChanged(),
        switchMap(instituicaoId => {

          if (instituicaoId) {

            return this.service.buscarCursos(instituicaoId);
          }

          return this.service.buscarCursosPadrao();
        })
      )
      .subscribe();

    this.form.get('flagSemInstituicao').valueChanges
      .subscribe(selected => {

        if (!selected) {
          this.form.get('instituicao').enable();
          return;
        }

        this.form.get('instituicao').reset(null);
        this.form.get('instituicao').disable();
      })
  }

  
}
