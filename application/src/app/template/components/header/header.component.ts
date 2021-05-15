import { Component, Input, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { TemplateService } from '../../template.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sidenavOpenMode: MatDrawerMode = 'over';
  @Input('title') headerTitle: string;

  constructor(private templateService: TemplateService) { }

  ngOnInit() { }

  public onToggleSidebar(): void {

    this.templateService.toggleSidenav();
  }

}
