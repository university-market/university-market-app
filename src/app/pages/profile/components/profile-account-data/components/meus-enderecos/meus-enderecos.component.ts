import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/base/services/auth.service';
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
  

  constructor(
    private profile: ProfileService,
    private auth: AuthService,
    private dialog: MatDialog,
    private notification: NotificationService 
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
      this.notification.success('Contato cadastrado com sucesso');  
      this.enderecos.push(model);
    })
  }

}
