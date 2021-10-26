import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
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
    public dialog: MatDialog,
    private profile: ProfileService,
    private notification: NotificationService,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.profile.searchContatosByUser(this.auth.user.usuarioId)
      .subscribe(contatos => {
        this.contatos = contatos;
        console.log(this.contatos)
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
      // tap(model => {
      //   this.contatos.push(model)
      // }),
      switchMap(model => 
        this.profile.cadastraContato(model)
        
      )

    ).subscribe(() => {
      this.notification.success('Contato cadastrado com sucesso');  
    })
  }
}
