import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from '../models/profile-user.model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  @Input() user: UserModel;
  @Output() onLogout = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

}
