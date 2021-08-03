import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class UniversityMarketInterceptor implements HttpInterceptor {

	constructor (private notification: NotificationService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		console.log('req is', req);

		return next.handle(req)
			.pipe(
				catchError(error => {
					this.notification.error(error.error.message, 0);
					throw error;
				})
			);
	}
}