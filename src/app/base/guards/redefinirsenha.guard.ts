import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

const API_URL = environment.apiUrl + environment.auth;

@Injectable()
export class RedefinirSenhaGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = route.params['token'];

    if (token == null) {

      this.notification.error("Página não encontrada");

      this.router.navigate(['/auth']);
      return false;
    }

    return this.validarToken(token)
      .pipe(
        catchError(err => {

          this.router.navigate(['/auth']);
          throw err;
        }),
        filter((res: boolean) => res),
        tap(() => this.notification.notify("A autenticidade da página foi verificada")),
        // map(res => res as boolean)
      );
  }

  // Private method

  private validarToken(token: string): Observable<boolean> {

    return this.http.get<boolean>(API_URL + `/estudante/recuperarsenha/${token}`)
      .pipe(
        take(1)
      );
  }
}