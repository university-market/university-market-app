import { Component, OnInit } from '@angular/core';
import { NEW_RESOURCE } from 'src/app/shared/const/default-consts';
import { ApplicationRoutesEnum } from 'src/app/shared/enum/application-routes.enum';

@Component({
  selector: 'app-publicacao-list-header',
  templateUrl: './publicacao-list-header.component.html',
  styleUrls: ['./publicacao-list-header.component.scss']
})
export class PublicacaoListHeaderComponent implements OnInit {

  public NEW_RESOURCE = NEW_RESOURCE;

  constructor() { }

  ngOnInit() { }

}
