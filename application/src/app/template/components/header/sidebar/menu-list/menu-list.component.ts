import { Component, OnInit } from '@angular/core';
import { ApplicationRoutesEnum } from 'src/app/shared/enum/application-routes.enum';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  route = ApplicationRoutesEnum;

  routes: {
    route: string,
    label: string,
    help?: string,
    icon?: string,
    value: {
      route: ApplicationRoutesEnum,
      queryParams?: string,
      callbackFn?: () => void
    }
  }[] = [
    {
      route: 'home',
      label: 'Homepage',
      icon: 'home',
      value: {
        route: ApplicationRoutesEnum.home
      }
    }, {
      route: 'perfil',
      label: 'Perfil',
      icon: 'person',
      value: {
        route: ApplicationRoutesEnum.profile
      }
    }, {
      route: 'pesquisa',
      label: 'Pesquisar',
      icon: 'search',
      value: {
        route: ApplicationRoutesEnum.search
      }
    }
  ]

  constructor() { }

  ngOnInit() { }

}
