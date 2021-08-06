import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { navigation } from 'src/app/core/navigation/navigation';
import { NavigationItemModel } from 'src/app/core/static/navigation-item.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @Output() public onNavigate = new EventEmitter<boolean>();

  public showFiller = false;

  public menuList: NavigationItemModel[] = [];
  private _menuList: NavigationItemModel[] = navigation;

  constructor() { }

  ngOnInit() {
    this.menuList = this._menuList.filter(m => m.disabled !== true).slice();
  }

}
