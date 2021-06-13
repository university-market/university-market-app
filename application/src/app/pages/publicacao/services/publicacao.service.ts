import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, take, tap } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
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

  private _loadingEdicao = new BehaviorSubject<boolean>(false);
  public loadingEdicao$ = this._loadingEdicao.asObservable();

  constructor (
    private http: HttpClient,
    private snackbar: SnackBarService
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

    // Iniciando loading
    this._loadingEdicao.next(true);

    return this._obter(publicacaoId)
      .pipe(
        tap(p => this._publicacao.next(p)),
        finalize(() => this._loadingEdicao.next(false))
      );
  }

  private _obter(publicacaoId: number): Observable<PublicacaoCriacaoModel> {

    return this.http.get<PublicacaoCriacaoModel>(`${API_URL}/${publicacaoId}`)
      .pipe(
        take(1)
      );
  }

  public criar(publicacao: PublicacaoCriacaoModel): Observable<number> {

    // Iniciando loading
    this._loadingEdicao.next(true);

    return this._criar(publicacao)
      .pipe(
        finalize(() => this._loadingEdicao.next(false))
      );
  }

  private _criar(publicacao: PublicacaoCriacaoModel): Observable<number> {
    
    return this.http.post<number>(`${API_URL}/create`, publicacao)
      .pipe(
        take(1),
        catchError(err => {
          this.snackbar.error(err.error.message);
          throw err;
        })
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
