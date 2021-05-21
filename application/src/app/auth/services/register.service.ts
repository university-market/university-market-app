import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://localhost:9090/usuario/register'

  constructor(private http: HttpClient,
              private Snack : SnackBarService) { }

  // Função Responsável por realizar o cadastro do usuário
  doRegister (register: RegisterModel): Observable<RegisterModel>{
    return this.http.post<RegisterModel>(this.baseUrl , register).pipe(
      catchError(err => {
        this.Snack.show(err.error.message,3000,'msg-error')
        return throwError(err);
      })
    )
  }
}
