import { Component, OnInit } from '@angular/core';
import { NEW_RESOURCE } from 'src/app/shared/const/default-consts';

@Component({
  selector: 'app-about-um-header',
  templateUrl: './about-um-header.component.html',
  styleUrls: ['./about-um-header.component.scss']
})
export class AboutUmHeaderComponent implements OnInit {

  public NEW_RESOURCE = NEW_RESOURCE;

  constructor() { }

  ngOnInit() {
  }

}
