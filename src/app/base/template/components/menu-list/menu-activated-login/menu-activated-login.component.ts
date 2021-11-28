import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, filter, switchMap } from 'rxjs/operators';

import { AuthService } from 'src/app/base/services/auth.service';
import { DialogService } from 'src/app/base/services/dialog.service';
import { NotificationService } from 'src/app/base/services/notification.service';

@Component({
  selector: 'app-menu-activated-login',
  templateUrl: './menu-activated-login.component.html',
  styleUrls: ['./menu-activated-login.component.scss']
})
export class MenuActivatedLoginComponent implements OnInit {

  public nome: string = null;
  public primeiraLetraNome: string = null;
  public cursoNome: string = null;

  public loading = true;

  constructor (
    private authService: AuthService,
    private dialog: DialogService,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {

    this.nome = this.authService.estudante?.nome ?? 'Não foi possível carregar o nome';
    this.primeiraLetraNome = this.authService.estudante?.nome[0] ?? '.';
    this.cursoNome = this.authService.estudante?.cursoNome ?? 'Não possível obter o curso';

    this.primeiraLetraNome = this.primeiraLetraNome.toUpperCase();

    setTimeout(() => this._stopLoading(), 2000);
  }

  public logout(): void {

    const message = `Deseja realmente sair do sistema? Você será imediatamente desconectado`;

    this.loading = true;

    this.dialog.openConfirmDialog(message, 'Desejo sair', 'Permanecer')
      .pipe(
        filter(res => {
          if (!res) {
            this._stopLoading();
            return false;
          }
          return true;
        }),
        delay(500),
        switchMap(() => this.authService.logout())
      )
      .subscribe(() => {

        this.notification.notify('Você foi desconectado!');
        this.router.navigate(['/auth']);
      });
  }

  private _stopLoading(): void {

    this.loading = false;
  }
}
