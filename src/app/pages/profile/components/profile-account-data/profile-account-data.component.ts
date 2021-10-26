import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/base/services/auth.service';
import { MeusDadosUserModel } from '../../models/meus-dados-user.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-account-data',
  templateUrl: './profile-account-data.component.html',
  styleUrls: ['./profile-account-data.component.scss']
})
export class ProfileAccountDataComponent implements OnInit {
 
  user : MeusDadosUserModel = {} as MeusDadosUserModel;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
    ) {}

  ngOnInit() {
    this.profileService.DadosUserbyId(this.authService.user.usuarioId)
    .subscribe(user => {
      this.user = user;
    })
  }

}
