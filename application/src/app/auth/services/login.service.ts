import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:9090/usuario'

  constructor(private http: HttpClient,
              private Snack : SnackBarService) { }

  // Função Responsável enviar os dados de login para o backend
  doLogin(login : LoginModel): Observable<LoginModel> {
    const Url = this.baseUrl + '/auth'
    return this.http.post<LoginModel>(Url,login).pipe(
      catchError((err) => {
        this.Snack.show (err.error.message,3000,'msg-error')
        return throwError(err);
      })
    )
  }
}
