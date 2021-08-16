import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/register.model';

const API_URL = environment.apiUrl + environment.usuario;

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { }

  // Função Responsável por realizar o cadastro do usuário
  doRegister (register: RegisterModel): Observable<RegisterModel> {
    
    return this.http.post<RegisterModel>(API_URL + '/register/', register);
  }

  validateEmail(email : string): Observable<any> {
    
    return this.http.post<any>(API_URL + '/emailValidate', {email: email});
  }
}
