import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:3000/login'

  constructor(private http: HttpClient) { }

  // Função Responsável enviar os dados de login para o backend
  doLogin(login : LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.baseUrl,login)
  }
}
