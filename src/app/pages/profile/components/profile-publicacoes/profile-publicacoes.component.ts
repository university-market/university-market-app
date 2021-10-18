import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
import { DialogService } from 'src/app/base/services/dialog.service';
import { ProfilePublicacoesModel } from '../../models/profile-publicacaoes.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-publicacoes',
  templateUrl: './profile-publicacoes.component.html',
  styleUrls: ['./profile-publicacoes.component.scss']
})
export class ProfilePublicacoesComponent implements OnInit {


  public publicacoesList: ProfilePublicacoesModel[] = [];

  
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private dialogService : DialogService
  ) {}

  ngOnInit() { 
    this.profileService.searchPublibyUser(this.authService.user.usuarioId)
      .subscribe(publicacoes => {
        this.publicacoesList = publicacoes
      })
  }

  excluir(publicacaoId: number){
   this.dialogService.openConfirmDialog('Tem certeza que deseja excluir esta publicação?')
      .pipe(
        filter((r) => r),
        switchMap(() => this.profileService.deletePublicacao(publicacaoId))
      ).subscribe(()=>{
        var list = this.publicacoesList.filter(e => e.publicacaoId != publicacaoId)
        this.publicacoesList = list;
      })
  }

}
