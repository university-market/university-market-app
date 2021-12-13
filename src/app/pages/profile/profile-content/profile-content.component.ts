import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit {

  @Output('onLogout') public onLogout = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
