import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApplicationRoutesEnum } from 'src/app/shared/enum/application-routes.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  routes: {route: string, value: { icon?: string, route: ApplicationRoutesEnum } }[] = [
    {
      route: 'home',
      value: {
        route: ApplicationRoutesEnum.home
      }
    }, {
      route: 'perfil',
      value: {
        route: ApplicationRoutesEnum.profile
      }
    }, {
      route: 'pesquisa',
      value: {
        route: ApplicationRoutesEnum.search
      }
    }
  ]
  constructor() { }

  ngOnInit() { }

}
