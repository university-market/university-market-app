import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginModel } from '../models/login.model';
import { AuthService } from 'src/app/base/services/auth.service';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Função Responsável enviar os dados de login para o backend
  doLogin(login : LoginModel): Observable<{nome: string}> {

    return this.authService.login(login)
      .pipe(
        map(model => ({ nome: model.nome }))
      );
  }

  public esqueciMinhaSenha(email: string): Observable<{expirationTime: number, existente: boolean}> {

    return this.http.post<any>(environment.apiUrl + environment.account + `/recuperacaosenha/solicitar`, {email: email})
      .pipe(
        take(1)
      );
  }
}
