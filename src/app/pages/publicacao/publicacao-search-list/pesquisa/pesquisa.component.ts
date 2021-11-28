import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/base/services/notification.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit {

  form : FormGroup

  constructor(
    private notification: NotificationService,
    private route: Router
  ) {
    this.form = new FormGroup({
      pesquisa : new FormControl(null,[Validators.required]),
    });
   }

  ngOnInit() {
  }

  validar(){
    if(this.form.invalid){
      this.notification.error('Favor informar o conteúdo da busca')
      return false;
    }

    if (!this.form.get('pesquisa')?.value) {
      
      this.form.markAllAsTouched();

      this.notification.error("Favor informar o conteúdo da busca");
      return false;
    }

    return true;
  }

  pesquisar(){

    if(!this.validar()){
      return;
    }
    this.route.navigate(['/publicacao/busca'],{
      queryParams:{
        pesquisa : this.form.get('pesquisa')?.value 
      }
    });

  }

}
