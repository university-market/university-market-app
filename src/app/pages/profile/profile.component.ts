import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/base/services/auth.service';
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
    private authService: AuthService,
    private profileService: ProfileService
    ) {}

  ngOnInit() {

    this.profileService.searchUserById(this.authService.user.usuarioId)
        .subscribe( user => {
          this.user = user;
        }
    )
  }

}
