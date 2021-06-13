import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { API_Routes, environment } from 'src/environments/environment';
import { PublicacaoCriacaoModel } from '../models/publicacao-criacao.model';

const API_URL = environment.dev + API_Routes.publicacao;

@UntilDestroy()
@Injectable()
export class PublicacaoService {

  private _isEdicao = new BehaviorSubject<boolean>(false);
  public isEdicao$ = this._isEdicao.asObservable();

  private _publicacao = new BehaviorSubject<PublicacaoCriacaoModel>({} as PublicacaoCriacaoModel);
  public publicacao$ = this._publicacao.asObservable();

  constructor (
    private http: HttpClient
  ) { }

  public init(publicacaoId: number): Observable<PublicacaoCriacaoModel|null> {

    if (isNaN(publicacaoId)) {

      this._isEdicao.next(false);
      return of(null);
    }

    this._isEdicao.next(true);
    return this.obter(publicacaoId);
  }

  public obter(publicacaoId: number): Observable<PublicacaoCriacaoModel> {
    return this._obter(publicacaoId)
      .pipe(
        tap(p => this._publicacao.next(p))
      );
  }

  private _obter(publicacaoId: number): Observable<PublicacaoCriacaoModel> {

    return this.http.get<PublicacaoCriacaoModel>(`${API_URL}/${publicacaoId}`)
      .pipe(
        take(1)
      );
  }

  public criar(publicacao: PublicacaoCriacaoModel): Observable<number> {

    return this._criar(publicacao).pipe();
  }

  private _criar(publicacao: PublicacaoCriacaoModel): Observable<number> {
    
    return this.http.post<number>(`${API_URL}/create`, publicacao)
      .pipe(
        take(1)
      );
  }

  public editar(publicacaoId: number, model: PublicacaoCriacaoModel): Observable<void> {

    return this._editar(publicacaoId, model).pipe();
  }

  private _editar(publicacaoId: number, model: PublicacaoCriacaoModel): Observable<void> {

    return this.http.put<void>(`${API_URL}/${publicacaoId}`, model)
      .pipe(
        take(1)
      );
  }

  

}
