import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
import { DialogService } from 'src/app/base/services/dialog.service';
import { NotificationService } from 'src/app/base/services/notification.service';
import { ProfilePublicacoesModel } from '../../models/profile-publicacaoes.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-favoritas',
  templateUrl: './profile-favoritas.component.html',
  styleUrls: ['./profile-favoritas.component.scss']
})
export class ProfileFavoritasComponent implements OnInit {

  public publicacoesList: ProfilePublicacoesModel[] = [];

  
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private dialogService : DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {}

  ngOnInit() { 
    this.profileService.searchFavoritePubli(this.authService.estudante.estudanteId)
      .subscribe(publicacoes => {
        this.publicacoesList = publicacoes
      })
  }

  excluir(publicacaoId: number){
   this.dialogService.openConfirmDialog('Tem certeza que deseja excluir esta publicação da sua lista de favoritos?')
      .pipe(
        filter((r) => r),
        switchMap(() => this.profileService.deletePublicacaoFavorita(publicacaoId))
      ).subscribe(()=>{
        var list = this.publicacoesList.filter(e => e.publicacaoId != publicacaoId)
        this.publicacoesList = list;
        this.notification.success('Favorita excluida com sucesso.')
      })
  }


}
