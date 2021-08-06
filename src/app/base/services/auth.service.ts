import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  /**
   * @property A boolean observable that said if user is authenticated or not
   */
  public isAuthenticated = this._isAuthenticated.asObservable();

  constructor() { }

}
