import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionTypeEnum } from 'src/app/core/static/session-type.enum';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _authTokenKey = "Um-Auth-Token";
  private _sessionTypeKey = "Session-Type";
  private _sessionType = SessionTypeEnum.Estudante;

  constructor(private _notification: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Header for http requests, like authentication token, should be inserted here
    
    const request = req.clone({
      setHeaders: {
        "Um-Auth-Token": "",
        "Session-Type": SessionTypeEnum.Estudante.toString()
      }
    });

    console.log('req is', req);

    return next.handle(request)
      .pipe(
        catchError(error => {
          this._notification.error(error.error.message, 0);
          throw error;
        })
      );
  }
}