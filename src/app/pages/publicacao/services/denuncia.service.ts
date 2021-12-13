import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PublicacaoDenunciaModel } from '../models/publicacao-denuncia.model';
import { TipoDenunciaModel } from '../models/tipos-denuncias-model';

const API_URL = environment.apiUrl + environment.denuncia;

@UntilDestroy()
@Injectable()
export class DenunciaService {

  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();

  constructor(private http: HttpClient) { }

  public denunciar(publicacaoId: number, model: PublicacaoDenunciaModel) {

    this._loading.next(true);

    return this.http.post<void>(API_URL + `/${publicacaoId}/denunciar`, model)
      .pipe(
        take(1),
        finalize(() => this._loading.next(false))
      );
  }

  public obterTipoDenuncias():Observable<TipoDenunciaModel[]> {

    return this.http.get<TipoDenunciaModel[]>(API_URL + `/tipos`)
      .pipe(
        take(1),
        finalize(() => this._loading.next(false))
      );
  }

}
