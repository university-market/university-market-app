import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { applicationName } from 'src/app/core/static/application-name';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output('openDrawer') public menu: EventEmitter<boolean> = new EventEmitter<boolean>();
  public title: string = applicationName;

  constructor() { }

  ngOnInit() {
  }

  onMenuClick(): void {

    this.menu.emit(true);
  }

}
