import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  private readonly authTokenKey: string = "authToken";

  constructor() {}

  public getAuthToken(): string {

    return this._getAuthToken();
  }

  public persistAuthToken(token: string): void {

    this._persistAuthToken(token);
  }

  public clearAuthToken(): void {

    this._clearAuthToken();
  }

  /**
   * 
   * 
   * Private method - Controle do token de autenticao em LocalStorage
   * 
   * 
   *///

  private _getAuthToken(): string {

    const token: string = localStorage.getItem(this.authTokenKey);

    return token ?? null;
  }

  private _persistAuthToken(token: string): void {

    const tokenExistente: string = localStorage.getItem(this.authTokenKey);

    if (tokenExistente != null)
      return;

    localStorage.setItem(this.authTokenKey, token);
  }

  private _clearAuthToken(): void {

    localStorage.removeItem(this.authTokenKey);
  }
}