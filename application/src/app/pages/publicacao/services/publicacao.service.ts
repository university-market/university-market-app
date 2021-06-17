import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, mapTo, switchMap, take, tap } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { API_Routes, environment } from 'src/environments/environment';
import { PublicacaoCriacaoModel } from '../models/publicacao-criacao.model';
import { PublicacaoDetalheModel } from '../models/publicacao-detalhe.model';
import { PublicacaoTag } from '../models/publicacao-tag.model';

const API_URL = environment.dev + API_Routes.publicacao;

@UntilDestroy()
@Injectable()
export class PublicacaoService {

  private _isEdicao = new BehaviorSubject<boolean>(false);
  public isEdicao$ = this._isEdicao.asObservable();

  private _publicacao = new BehaviorSubject<PublicacaoDetalheModel>({} as PublicacaoDetalheModel);
  public publicacao$ = this._publicacao.asObservable();

  private _loadingEdicao = new BehaviorSubject<boolean>(false);
  public loadingEdicao$ = this._loadingEdicao.asObservable();

  private _loadingDetails = new BehaviorSubject<boolean>(false);
  public loadingDetails$ = this._loadingDetails.asObservable();

  constructor (
    private http: HttpClient,
    private snackbar: SnackBarService
  ) { }

  public init(publicacaoId: number): Observable<PublicacaoDetalheModel|null> {

    if (isNaN(publicacaoId)) {

      this._isEdicao.next(false);
      return of(null);
    }

    this._isEdicao.next(true);
    return this.obter(publicacaoId);
  }

  public obter(publicacaoId: number): Observable<PublicacaoDetalheModel> {

    // Iniciando loading
    this._loadingEdicao.next(true);
    this._loadingDetails.next(true);

    return this._obter(publicacaoId)
      .pipe(
        tap(p => this._publicacao.next(p)),
        finalize(() => {
          this._loadingEdicao.next(false);
          this._loadingDetails.next(false);
        })
      );
  }

  private _obter(publicacaoId: number): Observable<PublicacaoDetalheModel> {

    return this.http.get<PublicacaoDetalheModel>(`${API_URL}/${publicacaoId}`)
      .pipe(
        take(1),
        catchError(err => {
          this.snackbar.error(err.error.message);
          throw err;
        })
      );
  }

  public criar(publicacao: PublicacaoCriacaoModel): Observable<number> {

    // Iniciando loading
    this._loadingEdicao.next(true);

    // Construcao FormData
    const formData = new FormData();
    formData.append('titulo', publicacao.titulo);
    formData.append('descricao', publicacao.descricao);
    formData.append('tags', publicacao.tags);
    formData.append('detalhesTecnicos', publicacao.detalhesTecnicos);
    formData.append('valor', publicacao.valor.toString());
    formData.append('image', publicacao.pathImagem);

    return this._criar(formData)
      .pipe(
        finalize(() => this._loadingEdicao.next(false))
      );
  }

  private _criar(publicacao: any): Observable<number> {
    
    return this.http.post<number>(`${API_URL}/create`, publicacao)
      .pipe(
        take(1),
        catchError(err => {
          this.snackbar.error(err.error.message);
          throw err;
        })
      );
  }

  public editar(publicacaoId: number, model: PublicacaoCriacaoModel): Observable<{publicacaoId: number}> {

    // Iniciando loading
    this._loadingEdicao.next(true);

    return this._editar(publicacaoId, model)
      .pipe(
        finalize(() => this._loadingEdicao.next(false)),
        map(() => ({publicacaoId}))
      );
  }

  private _editar(publicacaoId: number, model: PublicacaoCriacaoModel): Observable<void> {

    return this.http.put<void>(`${API_URL}/${publicacaoId}`, model)
      .pipe(
        take(1),
        catchError(err => {
          this.snackbar.error(err.error.message);
          throw err;
        })
      );
  }

  public uploadImage(image: any): Observable<void> {

    // Iniciando loading
    this._loadingEdicao.next(true);

    const formData = new FormData();
    formData.append('image', image);

    return this._uploadImage(formData)
      .pipe(
        finalize(() => this._loadingEdicao.next(false))
      );
  }

  private _uploadImage(image: any): Observable<void> {

    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<void>(`${API_URL}/image`, image)
      .pipe(
        take(1),
        catchError(err => {
          this.snackbar.error(err.error.message);
          throw err;
        })
      );
  }

  // Operacoes com tags de publicacao
  public makeTagsString = (tags: PublicacaoTag[]) => tags ? tags.map<string>(t => (t.name)).join(',') : null;

  public makeTagsArray = (tags: string) => tags ? tags.split(',').map<PublicacaoTag>(t => ({ name: t.trim() })) : null;
  

}
