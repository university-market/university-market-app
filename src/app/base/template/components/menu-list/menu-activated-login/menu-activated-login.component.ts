import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/base/services/auth.service';

@Component({
  selector: 'app-menu-activated-login',
  templateUrl: './menu-activated-login.component.html',
  styleUrls: ['./menu-activated-login.component.scss']
})
export class MenuActivatedLoginComponent implements OnInit {

  public nome: string = null;
  public primeiraLetraNome: string = null;
  public cursoNome: string = null;

  constructor (private authService: AuthService) { }

  ngOnInit() {

    this.nome = this.authService.estudante?.nome ?? 'Não foi possível carregar o nome';
    this.primeiraLetraNome = this.authService.estudante?.nome[0] ?? '.';
    this.cursoNome = this.authService.estudante?.cursoNome ?? 'Não possível obter o curso';

    this.primeiraLetraNome = this.primeiraLetraNome.toUpperCase();
  }

}
