import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationItemModel } from 'src/app/core/static/navigation-item.model';

@Component({
  selector: 'app-menu-list-group',
  templateUrl: './menu-list-group.component.html',
  styleUrls: ['./menu-list-group.component.scss']
})
export class MenuListGroupComponent implements OnInit {

  @Input('active') active: boolean = false;
  @Input('item') menuItem: NavigationItemModel;
  @Output() onNavigate = new EventEmitter<boolean>();

  public panelOpened: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
