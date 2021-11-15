import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
import { DialogService } from 'src/app/base/services/dialog.service';
import { NotificationService } from 'src/app/base/services/notification.service';
import { PublicacaoListagemModel } from 'src/app/pages/publicacao/models/publicacao-listagem.model';
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
    private dialogService : DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {}

  ngOnInit() { 
    this.profileService.searchPublibyUser(this.authService.estudante.estudanteId)
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
        this.notification.success('Publicação excluida com sucesso.')
      })
  }

  onNovaPublicacaoClick(): void {
    this.router.navigate(['/publicacao', 'nova'], {relativeTo: this.route.root});
  }

  marcarVendida(publicacao: ProfilePublicacoesModel){
    this.dialogService.openConfirmDialog('Tem certeza que deseja marcar esta publicação como vendida?')
      .pipe(
        filter((r) => r),
        switchMap(() => this.profileService.marcarVendida(publicacao))
      ).subscribe(()=>{
        this.notification.success('Publicação marcada como vendida com sucesso.')
      })
  }

}
