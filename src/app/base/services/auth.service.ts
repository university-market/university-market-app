import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginModel } from 'src/app/base/models/auth/login.model';
import { ProfileEstudanteModel } from '../models/profile-estudante.model';
import { AuthTokenService } from '../helpers/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly profileModelKey: string = "profileDataModel";

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  /**
   * @property Estudante is authenticated boolean
   */
  public isAuthenticated$ = this._isAuthenticated.asObservable();
  public prop_isAuthenticated: boolean = false;

  /**
   * @property {ProfileEstudanteModel} estudante Model de profile do estudante logado no sistema
   */
  public estudante: ProfileEstudanteModel = {} as ProfileEstudanteModel;

  constructor (
    private http: HttpClient,
    private authTokenHelper: AuthTokenService
  ) {

    // Quando a instância da service for criada, 
    // as propriedades devem ser preenchidas com os dados previamente persistidos

    const token = this.authTokenHelper.getAuthToken();

    {
      const authStatus = !(token == null);
      this._isAuthenticated.next(authStatus);
      this.prop_isAuthenticated = authStatus;
    }

    if (token == null)
      return;

    this.estudante = this._getProfileModel();
  }

  public logout(): Observable<void> {

    return this._logout()
      .pipe(
        tap(() => {

          // Define estudante como não autenticado
          this._isAuthenticated.next(false);
          this.prop_isAuthenticated = false;

          // Remover instancia de estudante
          this.estudante = {} as ProfileEstudanteModel;

          this._clearLocalProfile();
          this.authTokenHelper.clearAuthToken();
        })
      );
  }

  public login(model: LoginModel): Observable<ProfileEstudanteModel> {

    return this._login(model)
      .pipe(
        tap(res => {

          // Define estudante como autenticado
          this._isAuthenticated.next(true);
          this.prop_isAuthenticated = true;

          this.authTokenHelper.persistAuthToken(res.token);
        }),
        switchMap(() => {

          return this._obterProfile();
        }),
        map(model => {

          // Preencher instancia de estudante
          this.estudante = model;

          this._persistProfile(model);
          return model;
        })
      );
  }

  /**
   * 
   * 
   * Auth Http Requests
   * 
   * 
   */

  private _login(model: LoginModel): Observable<{token: string}> {

    return this.http.post<{token: string}>(environment.apiUrl + environment.auth + '/login', model)
      .pipe(
        take(1)
      );
  }

  private _logout(): Observable<void> {

    return this.http.post<void>(environment.apiUrl + environment.auth + '/logout', {})
      .pipe(
        take(1)
      );
  }

  private _obterProfile(): Observable<ProfileEstudanteModel> {

    return this.http.get<ProfileEstudanteModel>(environment.apiUrl + environment.account + '/profile')
      .pipe(
        take(1)
      );
  }

  /**
   * 
   * 
   * Local Storage Operations
   * 
   * 
   */

  private _getProfileModel(): ProfileEstudanteModel {

    const modelSerialized: string = localStorage.getItem(this.profileModelKey);

    if (modelSerialized == null)
      return;

    return JSON.parse(modelSerialized) as ProfileEstudanteModel;
  }

  private _persistProfile(estudante: ProfileEstudanteModel): void {

    if (estudante == null)
      return;

    const estudanteSerialized = JSON.stringify(estudante);

    localStorage.setItem(this.profileModelKey, estudanteSerialized);
  }

  private _clearLocalProfile(): void {

    localStorage.removeItem(this.profileModelKey);
  }
}
