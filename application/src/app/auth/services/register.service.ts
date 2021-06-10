import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { RegisterModel } from '../models/register.model';

@Injectable()
export class RegisterService {

  private baseUrl = 'http://localhost:9090/usuario'

  constructor(private http: HttpClient,
              private Snack : SnackBarService) { }

  // Função Responsável por realizar o cadastro do usuário
  doRegister (register: RegisterModel): Observable<RegisterModel>{
    const url = this.baseUrl + '/register/'
    console.log(url)
    return this.http.post<RegisterModel>( url, register).pipe(
      catchError(err => {
        this.Snack.error(err.error.message,3000,)
        return throwError(err);
      })
    )
  }

  validateEmail(email : string): Observable<any>{
    const url = this.baseUrl + '/emailValidate'
    console.log(url)
    return this.http.post<any>( url, {email: email}).pipe(
      catchError(err => {
        this.Snack.error(err.error.message,1500)
        return throwError(err);
      })
    )
  }
}
