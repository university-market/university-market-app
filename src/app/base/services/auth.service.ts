import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSummarySession } from 'src/app/pages/auth/models/app-summary-session';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authTokenKey: string = "authToken";

  public isAuthenticated$ = new BehaviorSubject<boolean>(false);
  /**
   * @property A boolean observable that said if user is authenticated or not
   */

  private _authToken = new BehaviorSubject<string>(null);

  private _authModel = new BehaviorSubject<AppSummarySession>(null);

  constructor() { }

  public storageSummarySession(model: AppSummarySession): void {

    this.isAuthenticated$.next(true);

    this._storageSummarySession(model);
  }

  private _storageSummarySession(model: AppSummarySession): void {

    this._authToken.next(model.token);

    this._getAuthToken() ? null : this._persistAuthToken(model.token);

    this._authModel.next(model);
  }

  private _persistAuthToken(authToken: string): void {

    if (!authToken)
      return;

    localStorage.setItem(this.authTokenKey, authToken);
  }

  private _getAuthToken(): string {

    const token = this._authToken.getValue();

    if (token)
      return token;

    return localStorage.getItem(this.authTokenKey) ?? null;
  }


}
