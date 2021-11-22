import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit {

  form : FormGroup

  constructor(
    private route: Router
  ) { 
    this.form = new FormGroup({
      pesquisa : new FormControl(null,[Validators.required]),
    });
  }

  ngOnInit() {
  }

  pesquisar(){
    this.route.navigate(['/publicacao/busca'],{
      queryParams:{
        pesquisa : this.form.get('pesquisa')?.value 
      }
    })
  }

}
