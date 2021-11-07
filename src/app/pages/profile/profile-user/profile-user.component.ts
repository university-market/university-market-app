import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerfilUserModel } from '../models/profile-user.model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  @Output() onLogout = new EventEmitter<void>();
  @Input() user: PerfilUserModel;

  constructor() {}

  ngOnInit() {}

}
