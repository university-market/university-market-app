import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class RedefinirSenhaGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(route);

    return true;
  }

  // Private method

  /**
   * @method _alertNotAuthenticated() Alertar usuário que não está autenticado
   */
  private _alertNotAuthenticated(): void {

    // Emissão de notificação
    console.error('Você não está autenticado');
    this.notification.warn('Você não está autenticado');
  }
}