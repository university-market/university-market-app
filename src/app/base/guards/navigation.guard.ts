import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NavigationGuard implements CanActivate {

  private _authenticationStatus: boolean = false;

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
    this.authService.isAuthenticated$
    .subscribe(authenticated => {

      this._authenticationStatus = authenticated;

      console.log('auth', authenticated);
      
      if (!authenticated) {

        // Notificar usuário
        // this._alertNotAuthenticated();

        // Navegar usuário para tela de autenticacao
        this.router.navigate(['/auth']);
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // /*
    if (!this._authenticationStatus) {
    // if (!this.authService.prop_isAuthenticated) {

      // Notificar usuário
      this._alertNotAuthenticated();

      // Navegar usuário para tela de autenticacao
      this.router.navigate(['/auth'], {relativeTo: this.route.root});
      return of(false);
    }
    // */

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