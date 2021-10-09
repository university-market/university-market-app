import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSummarySession } from 'src/app/pages/auth/models/app-summary-session';
import { environment } from 'src/environments/environment';
import { UsuarioLogadoModel } from '../models/usuario-logado.model';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authTokenKey: string = "authToken";

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  /**
   * @property {boolean} isAuthenticated$ A boolean observable: user is authenticated or not
   */
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  // Model resumida de session
  private _authModel = new BehaviorSubject<AppSummarySession>(null);

  /**
   * @property {UsuarioLogadoModel} user Model com dados do usuário logado no sistema
   */
  public user: UsuarioLogadoModel = null;

  constructor() { }

  public persistSummarySession(model: AppSummarySession): void {

    // Define usuário como autenticado
    this._isAuthenticated.next(true);

    // Persiste a model de session em subject
    this._authModel.next(model);

    this.persistAuthToken(model.token);
  }

  /**
   * @method `persistAuthToken` Realiza a persistência do token de autenticação
   * @param {string} token Token de session recebida da API
   * @returns `void`
   */
  public persistAuthToken(token: string): void {

    this._persistAuthToken(token);
  }

  // Private methods

  private _persistAuthToken(token: string): void {

    const tokenExistente: string = localStorage.getItem(this.authTokenKey);

    if (tokenExistente != null)
      return;

    localStorage.setItem(this.authTokenKey, token);
  }




}
