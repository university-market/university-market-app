import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';

const API_URL = environment.apiUrl + environment.usuario;

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  // Função Responsável enviar os dados de login para o backend
  doLogin(login : LoginModel): Observable<LoginModel> {

    return this.http.post<LoginModel>(API_URL + '/auth', login);
  }
}
