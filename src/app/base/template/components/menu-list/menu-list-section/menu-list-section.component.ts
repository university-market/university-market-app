import { Component, Input, OnInit } from '@angular/core';
import { NavigationItemModel } from 'src/app/core/static/navigation-item.model';

@Component({
  selector: 'app-menu-list-section',
  templateUrl: './menu-list-section.component.html',
  styleUrls: ['./menu-list-section.component.scss']
})
export class MenuListSectionComponent implements OnInit {

  @Input('item') menuItem: NavigationItemModel;

  constructor() { }

  ngOnInit() {
  }

}
