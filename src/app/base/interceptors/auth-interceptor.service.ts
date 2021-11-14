import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { applicationSessionType } from 'src/app/core/static/application-session-type';
import { SessionTypeEnum } from 'src/app/core/static/session-type.enum';
import { AuthTokenService } from '../helpers/auth-token.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _authTokenKey = "Um-Auth-Token";
  private _sessionTypeKey = "Session-Type";
  private _sessionType = applicationSessionType;

  constructor(
    private _notification: NotificationService,
    private authService: AuthService,
    private authTokenHelper: AuthTokenService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Header for http requests, like authentication token, should be inserted here
    
    const token = this.authTokenHelper.getAuthToken();

    const request = req.clone({
      setHeaders: {
        "Um-Auth-Token": token ?? '',
        "Session-Type": this._sessionType.toString()
      }
    });

    // console.log('req is', req);

    return next.handle(request)
      .pipe(
        catchError(error => {

          if (error?.status == 401) { // Unauthorized

            // Emitir mensagens ao usuário
            console.error(`${error?.status} - ${error?.statusText}`);
            this._notification.warn(error?.error, 0); // Emissão erro 'Não autenticado' lançado pela API

            // Atualizar status de autenticação da aplicação
            this.authService.logout();

            // Redirecionar usuário para tela de autenticação
            this.router.navigate(['/auth']);
            throw error;
          }

          this._notification.error(error?.error?.message, 0); // Emissão erro lançado pela API
          throw error;
        })
      );
  }
}