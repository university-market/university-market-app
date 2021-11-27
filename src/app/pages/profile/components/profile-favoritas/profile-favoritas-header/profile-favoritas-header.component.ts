import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-favoritas-header',
  templateUrl: './profile-favoritas-header.component.html',
  styleUrls: ['./profile-favoritas-header.component.scss']
})
export class ProfileFavoritasHeaderComponent implements OnInit {

  @Input() hasPublicacoes: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
