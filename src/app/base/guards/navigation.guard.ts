import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NavigationGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.prop_isAuthenticated) {

      // Notificar usuário
      this._alertNotAuthenticated();

      // Navegar usuário para tela de autenticacao
      this.router.navigate(['/auth'], {relativeTo: this.route.root});
      return of(false);
    }

    return of(true);
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