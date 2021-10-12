import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/base/services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-publicacoes',
  templateUrl: './profile-publicacoes.component.html',
  styleUrls: ['./profile-publicacoes.component.scss']
})
export class ProfilePublicacoesComponent implements OnInit {


  public publicacoesList = [];

  
  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    
    // this.publicacoesList.push(true);
    // this.publicacoesList.push(true);
    // this.publicacoesList.push(true);
    // this.publicacoesList.push(true);
    // this.publicacoesList.push(true);
  }

  ngOnInit() { 
    this.profileService.searchPublibyUser(this.authService.user.usuarioId)
      .subscribe(publicacoes => {
        this.publicacoesList = publicacoes
        console.log(this.publicacoesList)
      })
  }

}
