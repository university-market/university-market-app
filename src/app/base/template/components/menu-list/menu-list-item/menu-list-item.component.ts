import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationItemModel } from 'src/app/core/static/navigation-item.model';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss']
})
export class MenuListItemComponent implements OnInit {

  @Input('active') active: boolean = false;
  @Input('item') menuItem: NavigationItemModel;
  @Output() onNavigate = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

}
