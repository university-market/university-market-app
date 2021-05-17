import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://localhost:3000/register'

  constructor(private http: HttpClient) { }

  // Função Responsável por realizar o cadastro do usuário
  doRegister (register: RegisterModel): Observable<RegisterModel>{
    return this.http.post<RegisterModel>(this.baseUrl , register)
  }
}
