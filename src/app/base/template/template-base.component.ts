import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { applicationName } from 'src/app/core/static/application-name';

@Component({
  selector: 'app-template-base',
  templateUrl: './template-base.component.html',
  styleUrls: ['./template-base.component.scss']
})
export class TemplateBaseComponent implements OnInit {

  public maxWidth = 1000;
  public sidenavTitle = applicationName;
  public sidenavMode = 'side'; // over | side | push

  // Controle de sidebar aberto/fechado (modo responsivo)
  private _resizeSubscription: Subscription;
  private _screenWidth = new BehaviorSubject<number>(window.innerWidth);
  public screenWidth$ = this._screenWidth.asObservable();
  @ViewChild('drawer') sidenav: MatSidenav;
  @HostListener('window:resize', ['$event'])
  onResize = (event) => this._screenWidth.next(event.target.innerWidth);

  constructor () { }

  ngOnInit() {

    this._resizeSubscription = this.screenWidth$
    .pipe(
      distinctUntilChanged()
    )
    .subscribe(width => this.sidenavMode = width < this.maxWidth ? 'over' : 'side');
  }

  ngOnDestroy() {

    this._resizeSubscription.unsubscribe();
  }

}
