import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
import { environment } from 'src/environments/environment';
import { AppSummarySession } from '../models/app-summary-session';
import { LoginModel } from '../models/login.model';

const API_URL = environment.apiUrl + environment.auth;
@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Função Responsável enviar os dados de login para o backend
  doLogin(login : LoginModel): Observable<{nome: string}> {

    return this.http.post<AppSummarySession>(API_URL + '/estudante/login', login)
      .pipe(
        tap(model => {

          this.authService.persistSession(model);
        }),
        map(model => ({
          nome: model.nome
        }))
      )
  }
}
