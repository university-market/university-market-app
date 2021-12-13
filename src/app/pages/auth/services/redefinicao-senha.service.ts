import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + environment.account;

@Injectable()
export class RedefinicaoSenhaService {

  private _token = new BehaviorSubject<string>(null);
  private _email = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  public init(token: string) {

    this._token.next(token);
  }

  public autenticarSolicitacaoPorEmail(email: string): Observable<boolean> {

    this._email.next(email);

    return this._autenticarSolicitacaoPorEmail(email, this._token.getValue())
      .pipe(
        catchError(err => {

          this._email.next(null);
          throw err;
        })
      );
  }

  public alterarSenha(novaSenha: string): Observable<boolean> {

    const email = this._email.getValue();

    if (!email)
      return of(false);

    return this._alterarSenha(novaSenha, email)
      .pipe(
        map(() => true)
      )
  }

  // Private methods

  private _autenticarSolicitacaoPorEmail(email: string, token: string): Observable<boolean> {

    return this.http.get<boolean>(API_URL + '/recuperacaosenha/validar/email', {
      params: {
        email: email,
        token: token
      }
    }).pipe(
      take(1)
    );
  }

  private _alterarSenha(novaSenha: string, email: string): Observable<void> {

    return this.http.put<void>(API_URL + '/recuperacaosenha/alterar', {
        senha: novaSenha,
        email: this._email.getValue(),
        token: this._token.getValue()
      }).pipe(
        take(1)
      );
  }

}
