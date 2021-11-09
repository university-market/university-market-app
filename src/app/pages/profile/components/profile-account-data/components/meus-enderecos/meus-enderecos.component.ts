import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
import { DialogService } from 'src/app/base/services/dialog.service';
import { NotificationService } from 'src/app/base/services/notification.service';
import { MeusEnderecosModel } from 'src/app/pages/profile/models/meus-enderecos.model';
import { ProfileService } from 'src/app/pages/profile/services/profile.service';
import { EnderecosActionsComponent } from './enderecos-actions/enderecos-actions.component';

@Component({
  selector: 'app-meus-enderecos',
  templateUrl: './meus-enderecos.component.html',
  styleUrls: ['./meus-enderecos.component.scss']
})
export class MeusEnderecosComponent implements OnInit {

  enderecos: MeusEnderecosModel[];
  public isEdicao = false;
  
  constructor(
    private profile: ProfileService,
    private auth: AuthService,
    private dialog: MatDialog,
    private notification: NotificationService,
    private dialogService : DialogService
  ) { }

  ngOnInit() {
    this.profile.searchEnderecosByUser(this.auth.user.usuarioId)
      .subscribe(enderecos => {
        this.enderecos = enderecos
      })
  }

  adicionar(){
    this.dialog.open(EnderecosActionsComponent,{
      width : '500px',
      maxWidth: '80%'
    }).afterClosed().pipe( 
      filter((model) => {
        
        if(!model){
          return false;
        }
        return true;
      }),
      switchMap(model => 
        this.profile.cadastraEndereco(model)
      ),
    ).subscribe((model) => {
      this.notification.success('Endereço cadastrado com sucesso');  
      this.enderecos.push(model);
    })
  }

  deletarEndereco(id:number){
    this.dialogService.openConfirmDialog('Tem certeza que deseja excluir este endereço?')
      .pipe(
        filter((r) => r),
        switchMap(() => this.profile.deleteEndereco(id))
      ).subscribe(()=>{
        this.notification.success('Endereço deletado com sucesso');
        var list = this.enderecos.filter(e => e.id != id)
        this.enderecos = list;
      })
  }

  editarEndereco(endereco: MeusEnderecosModel){
    this.dialog.open(EnderecosActionsComponent,{
      width : '500px',
      maxWidth: '80%',
      data: endereco
    }).afterClosed().pipe( 
      filter((model) => {
        if(!model){
          return false;
        }
        return true;
      }),
      tap(model => {
        this.enderecos = this.enderecos.map(e => {
          if(e.id == model.id){
            return model;
          }
          return e;
        })
      }),
      switchMap(model => 
        this.profile.editarEndereco(model)
      ),
      catchError(err => {
        this.enderecos = this.enderecos.slice(0, this.enderecos.length -1 );
        throw err
      }),

    ).subscribe(() => {
      this.notification.success('Endereço editado com sucesso');  
    })
  }

}
