import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + environment.auth;

@Injectable()
export class RedefinicaoSenhaService {

  private _token = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  public init(token: string) {

    this._token.next(token);
  }

  public autenticarSolicitacaoPorEmail(email: string): Observable<boolean> {

    return this._autenticarSolicitacaoPorEmail(email, this._token.getValue());
  }

  // Private methods

  private _autenticarSolicitacaoPorEmail(email: string, token: string): Observable<boolean> {

    return this.http.get<boolean>(API_URL + '/estudante/recuperarsenha', {
      params: {
        email: email,
        token: token
      }
    }).pipe(
      take(1)
    );
  }

}
