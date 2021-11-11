import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/register.model';
import { KeyValuePair } from 'src/app/base/data-types/key-value-pair';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import { PASSWORD_MINLENGHT } from 'src/app/core/static/password-data';
import { finalize, take, tap } from 'rxjs/operators';

@Injectable()
export class RegisterService {

  private _instituicoes = new BehaviorSubject<KeyValuePair<number, string>[]>([]);
  public instituicoes$ = this._instituicoes.asObservable();

  private _cursos = new BehaviorSubject<KeyValuePair<number, string>[]>([]);
  public cursos$ = this._cursos.asObservable();

  public form: FormGroup = null;

  // Loading
  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();

  constructor(private http: HttpClient) {

    this.form = new FormGroup({
      nome : new FormControl(null, Validators.required),
      ra : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      telefone : new FormControl(null, [Validators.required, NgBrazilValidators.telefone]),
      dataNascimento :new FormControl(null,[Validators.required]),
      senha: new FormControl(null, [Validators.required, Validators.minLength(PASSWORD_MINLENGHT)]),
      confirmacaoSenha: new FormControl(null, Validators.required),
      curso: new FormControl(null, Validators.required),
      instituicao: new FormControl(null, Validators.required)
    });
  }

  // Função Responsável por realizar o cadastro do usuário
  public doRegister(model: RegisterModel): Observable<void> {
    
    return this._doRegister(model);
  }
  
  private _doRegister(model: RegisterModel): Observable<void> {

    return this.http.post<void>(environment.apiUrl + environment.estudante, model)
      .pipe(
        take(1)
      );
  }

  public buscarInstituicoes(): Observable<KeyValuePair<number, string>[]> {

    return this._buscarInstituicoes()
      .pipe(
        tap(data => this._instituicoes.next([...data]))
      );
  }

  private _buscarInstituicoes(): Observable<KeyValuePair<number, string>[]> {

    const url = environment.apiUrl + environment.instituicao;

    return this.http.get<KeyValuePair<number, string>[]>(url + '/listar')
      .pipe(
        take(1)
      );
  }

  public buscarCursos(instituicaoId: number): Observable<KeyValuePair<number, string>[]> {

    return this._buscarCursos(instituicaoId)
      .pipe(
        tap(data => {
          this._cursos.next([...data]);
        })
      );
  }

  private _buscarCursos(instituicaoId: number): Observable<KeyValuePair<number, string>[]> {

    const url = environment.apiUrl + environment.curso;

    return this.http.get<KeyValuePair<number, string>[]>(url + `/${instituicaoId ?? 'padrao'}/listar`)
      .pipe(
        take(1)
      );
  }

  public buscarCursosPadrao(): Observable<KeyValuePair<number, string>[]> {

    // Start loading
    this._loading.next(true);

    return this._buscarCursos(null)
      .pipe(
        tap(data => this._cursos.next([...data])),
        finalize(() => this._loading.next(false))
      );
  }
}
