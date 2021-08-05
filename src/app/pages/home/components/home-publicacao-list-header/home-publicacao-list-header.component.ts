import { Component, OnInit } from '@angular/core';
import { NEW_RESOURCE } from 'src/app/shared/const/default-consts';

@Component({
  selector: 'app-home-publicacao-list-header',
  templateUrl: './home-publicacao-list-header.component.html',
  styleUrls: ['./home-publicacao-list-header.component.scss']
})
export class HomePublicacaoListHeaderComponent implements OnInit {

  public NEW_RESOURCE = NEW_RESOURCE;

  constructor() { }

  ngOnInit() {
  }

}
