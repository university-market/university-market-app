import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TemplateService {

  private _sidenavOpened = new BehaviorSubject<boolean>(false);
  public sidenavOpened$: Observable<boolean> = this._sidenavOpened.asObservable();

  constructor() { }

  public toggleSidenav = () => this._sidenavOpened.next(!this._sidenavOpened.value);
}
