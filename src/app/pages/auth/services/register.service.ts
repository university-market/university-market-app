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
import { env } from 'process';

const API_URL = environment.apiUrl + environment.estudante;

@Injectable()
export class RegisterService {

  private _instituicoes = new BehaviorSubject<KeyValuePair<number, string>[]>([]);
  public instituicoes$ = this._instituicoes.asObservable();

  private _cursos = new BehaviorSubject<KeyValuePair<number, string>[]>([]);
  public cursos$ = this._cursos.asObservable();

  public form: FormGroup = null;

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
    
    const instituicoes: KeyValuePair<number, string>[] = [
      {
        key: 1,
        value: 'Primeira Instituição de Teste - Ensino'
      }, 
      {
        key: 2,
        value: 'Outra Instituição de Ensino'
      }
    ];

    this._instituicoes.next(instituicoes);

    const cursos: KeyValuePair<number, string>[] = [
      {
        key: 1,
        value: 'Administração'
      },
      {
        key: 2,
        value: 'Análise e Desenvolvimento de Sistemas'
      },
      {
        key: 3,
        value: 'Direito'
      },
      {
        key: 4,
        value: 'Medicina Veterinária'
      }
    ];

    this._cursos.next(cursos);
  }

  // Função Responsável por realizar o cadastro do usuário
  doRegister (register: RegisterModel): Observable<RegisterModel> {
    
    return this.http.post<RegisterModel>(API_URL + '/register/', register);
  }

  validateEmail(email : string): Observable<any> {
    
    return this.http.post<any>(API_URL + '/emailValidate', {email: email});
  }

  public buscarInstituicoes(): Observable<KeyValuePair<number, string>[]> {

    return this._buscarInstituicoes()
      .pipe(
        tap(data => this._instituicoes.next(data))
      );
  }

  private _buscarInstituicoes(): Observable<KeyValuePair<number, string>[]> {

    const url = environment.apiUrl + environment.instituicao;

    return this.http.get<KeyValuePair<number, string>[]>(url + '/listar')
      .pipe(
        take(1)
      );
  }
}
