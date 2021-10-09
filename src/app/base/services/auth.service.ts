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
  private readonly userModelKey: string = "userDataModel";

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  /**
   * @property User is authenticated or not
   */
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  // Model resumida de session
  // private _authModel = new BehaviorSubject<AppSummarySession>(null);

  /**
   * @property {UsuarioLogadoModel} user Model com dados do usuário logado no sistema
   */
  public user: UsuarioLogadoModel = null;

  constructor() {

    // Quando a service for instanciada, as propriedades devem ser preenchidas com os dados previamente persistidos

    const token = this.getAuthToken();

    if (token != null) {

      this._isAuthenticated.next(false);
      return;
    }

    const userModel = this.getUserModel();
    this.user = userModel;

    this._isAuthenticated.next(true);
  }

  /**
   * @method `persistSession` Persiste os dados da session recebidos da API
   * @param {AppSummarySession} model Model de session recebida da API
   * @returns `void`
   */
  public persistSession(model: AppSummarySession): void {

    // Define usuário como autenticado
    this._isAuthenticated.next(true);

    // Persiste a model de session em subject
    // this._authModel.next(model);

    // Salvar token de autenticação da API
    this.persistAuthToken(model.token);

    const userModel: UsuarioLogadoModel = {
      usuarioId: model.userId
    };

    // Salvar dados do usuario
    this.persistUserData(userModel);
  }

  /**
   * @method `getAuthToken()` Obtém o token de autenticação utilizado pela API
   * @returns {string} `Token de autenticação`
   */
   public getAuthToken(): string {

    return this._getAuthToken();
  }

  /**
   * @method `getUserModel()` Obtém a model de usuário persistida
   * @returns {UsuarioLogadoModel} Model do usuário logado
   */
   public getUserModel(): UsuarioLogadoModel {

    return this._getUserModel();
  }

  /**
   * @method `setAsUnauthenticated()` Define o usuário como não autenticado
   * @description Utilizado quando a API responde com status 403 (Não autenticado)
   * @returns `void`
   */
   public setAsUnauthenticated(): void {

    // Define usuário como não autenticado
    this._isAuthenticated.next(false);

    // Exclui o token de session previamente salvo
    localStorage.removeItem(this.authTokenKey);
  }

  /**
   * @method `persistAuthToken` Realiza a persistência do token de autenticação
   * @param {string} token Token de session recebida da API
   * @returns `void`
   */
  private persistAuthToken(token: string): void {

    this._persistAuthToken(token);
  }

  /**
   * @method `persistAuthToken` Realiza a persistência do token de autenticação
   * @param {string} token Token de session recebida da API
   * @returns `void`
   */
   private persistUserData(user: UsuarioLogadoModel): void {

    if (user == null)
      return;

    const userSerialized = JSON.stringify(user);

    localStorage.setItem(this.userModelKey, userSerialized);
  }

  // Private methods

  private _persistAuthToken(token: string): void {

    const tokenExistente: string = localStorage.getItem(this.authTokenKey);

    if (tokenExistente != null)
      return;

    localStorage.setItem(this.authTokenKey, token);
  }

  private _getAuthToken(): string {

    const token: string = localStorage.getItem(this.authTokenKey);

    return token ?? null;
  }

  private _getUserModel(): UsuarioLogadoModel {

    const modelSerialized: string = localStorage.getItem(this.userModelKey);

    if (modelSerialized == null)
      return;

    return JSON.parse(modelSerialized) as UsuarioLogadoModel;
  }
}
