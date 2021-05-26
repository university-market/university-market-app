import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NEW_RESOURCE } from 'src/app/shared/const/default-consts';
import { ApplicationRoutesEnum } from 'src/app/shared/enum/application-routes.enum';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.scss']
})
export class PublicacaoComponent implements OnInit {

  private publicacaoIdTest = 123;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public navigateToDetalhes(): void {

    this.router.navigate([ApplicationRoutesEnum.publicacao, this.publicacaoIdTest]);
  }

  public navigateToNovaPublicacao(isEdit: boolean): void {

    this.router.navigate([ApplicationRoutesEnum.publicacao, 'edit', isEdit ? this.publicacaoIdTest : NEW_RESOURCE]);
  }

}
