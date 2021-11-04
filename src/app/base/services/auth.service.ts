import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
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
  public prop_isAuthenticated: boolean = false;

  // Model resumida de session
  // private _authModel = new BehaviorSubject<AppSummarySession>(null);

  /**
   * @property {UsuarioLogadoModel} user Model com dados do usuário logado no sistema
   */
  public user: UsuarioLogadoModel = {} as UsuarioLogadoModel;

  constructor(private http: HttpClient) {

    // Quando a instância da service for criada, 
    // as propriedades devem ser preenchidas com os dados previamente persistidos

    const token = this.getAuthToken();

    {
      const authStatus = !(token == null);
      this._isAuthenticated.next(authStatus);
      this.prop_isAuthenticated = authStatus;
    }

    if (token == null)
      return;

    this.user = this.getUserModel();
  }

  /**
   * @method `persistSession` Persiste os dados da session recebidos da API
   * @param {AppSummarySession} model Model de session recebida da API
   * @returns `void`
   */
  public persistSession(model: AppSummarySession): void {

    // Define usuário como autenticado
    this._isAuthenticated.next(true);
    this.prop_isAuthenticated = true;

    // Persiste a model de session em subject
    // this._authModel.next(model);

    // Salvar token de autenticação da API
    this.persistAuthToken(model.token);

    const userModel: UsuarioLogadoModel = {
      usuarioId: model.userId,
      nome: model.nome
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

  public logout(): Observable<void> {

    return this.http.post<void>(environment.apiUrl + environment.auth + '/estudante/logout', {})
      .pipe(
        tap(() => this.setAsUnauthenticated()),
        take(1)
      );
  }

  /**
   * @method `setAsUnauthenticated()` Define o usuário como não autenticado
   * @description Utilizado quando a API responde com status 403 (Não autenticado)
   * @returns `void`
   */
   public setAsUnauthenticated(): void {

    // Define usuário como não autenticado
    this._isAuthenticated.next(false);
    this.prop_isAuthenticated = false;

    // Exclui o token de session previamente salvo
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userModelKey);
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
