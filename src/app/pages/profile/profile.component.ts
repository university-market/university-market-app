import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
import { DialogService } from 'src/app/base/services/dialog.service';
import { NotificationService } from 'src/app/base/services/notification.service';
import { PerfilUserModel } from './models/profile-user.model';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : PerfilUserModel = {} as PerfilUserModel;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {

    this.profileService.searchUserById(this.authService.user.usuarioId)
        .subscribe( user => {
          this.user = user;
        }
    )
  }

  public logout(): void {

    const message = "Tem certeza que deseja sair da sua conta?";

    this.dialogService.openConfirmDialog(message, 'Sim', 'Não')
    .pipe(
      filter(res => res),
      switchMap(() => this.authService.logout())
    )
    .subscribe(() => {

      this.notificationService.notify("Você foi desconectado");
      this.router.navigate(['/auth']);
    })

  }

}
