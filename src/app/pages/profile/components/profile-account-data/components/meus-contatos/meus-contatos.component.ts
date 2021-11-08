import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
import { DialogService } from 'src/app/base/services/dialog.service';
import { NotificationService } from 'src/app/base/services/notification.service';
import { MeusContatosModel } from 'src/app/pages/profile/models/meus-contatos.model';
import { ProfileService } from 'src/app/pages/profile/services/profile.service';
import { ContatosActionsComponent } from './contatos-actions/contatos-actions.component';

@Component({
  selector: 'app-meus-contatos',
  templateUrl: './meus-contatos.component.html',
  styleUrls: ['./meus-contatos.component.scss']
})
export class MeusContatosComponent implements OnInit {

  contatos: MeusContatosModel[]

  constructor(
    public  dialog: MatDialog,
    private profile: ProfileService,
    private notification: NotificationService,
    private auth: AuthService,
    private dialogService : DialogService
    ) { }

  ngOnInit() {
    this.profile.searchContatosByUser(this.auth.user.usuarioId)
      .subscribe(contatos => {
        this.contatos = contatos;
      });
      
  }

  adicionar(){
    this.dialog.open(ContatosActionsComponent,{
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
        this.profile.cadastraContato(model)
      ),
    ).subscribe((model) => {
      this.notification.success('Contato cadastrado com sucesso');  
      this.contatos.push(model)
    })
  }

  deletarContato(id: number){
    this.dialogService.openConfirmDialog('Tem certeza que deseja excluir este contato?')
      .pipe(
        filter((r) => r),
        switchMap(() => this.profile.deleteContato(id))
      ).subscribe(()=>{
        this.notification.success('Contato deletado com sucesso');
        var list = this.contatos.filter(e => e.id != id)
        this.contatos = list;
      })
    
  }

  editarContato(contato: MeusContatosModel){
    this.dialog.open(ContatosActionsComponent,{
      width : '500px',
      maxWidth: '80%',
      data: contato
    }).afterClosed().pipe( 
      filter((model) => {
        if(!model){
          return false;
        }
        return true;
      }),
      tap(model => {
        this.contatos = this.contatos.map(e => {
          if(e.id == model.id){
            return model;
          }
          return e;
        })
      }),
      switchMap(model => 
        this.profile.editarContato(model)
      ),
      catchError(err => {
        this.contatos = this.contatos.slice(0, this.contatos.length -1 );
        throw err
      }),

    ).subscribe(() => {
      this.notification.success('Contato editado com sucesso');  
    })
  }
}
