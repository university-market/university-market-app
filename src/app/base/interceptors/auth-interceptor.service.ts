import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _notification: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const request = req.clone();

    // Header for http requests, like authentication token, should be inserted here

    console.log('req is', req);

    return next.handle(req)
      .pipe(
        catchError(error => {
          this._notification.error(error.error.message, 0);
          throw error;
        })
      );
  }
}