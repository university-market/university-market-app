import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/base/services/auth.service';

@Component({
  selector: 'app-home-curso-publicacao-header',
  templateUrl: './home-curso-publicacao-header.component.html',
  styleUrls: ['./home-curso-publicacao-header.component.scss']
})
export class HomeCursoPublicacaoHeaderComponent implements OnInit {

  public curso: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.curso = this.authService.estudante.cursoNome;
  }

}
