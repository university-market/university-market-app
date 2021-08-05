import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _config: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };
  private _defaultDuration = 5000; // In milliseconds
  private _dismissIcon = '\u2716'; // HTML code for 'x' (close)
  private _baseClass = 'snackbar-instance';

  constructor(private snackBar: MatSnackBar) { }

  /**
   * @method notify | Notificação padrão do sistema
   * @param message Mensagem a ser exibida no snackbar
   * @param aditionalDuration Optional | Tempo adicional para o snackbar ser exibido (em milissegundos)
   * @returns void
   */
  public notify(message: string, aditionalDuration?: number): void {

    const finalClass = `snackbar-notify`;
    this._show(message, 
      this._generateConfig(finalClass, aditionalDuration) as MatSnackBarConfig);
  }

  /**
   * @method success | Notificação de sucesso padrão do sistema
   * @param message Mensagem a ser exibida no snackbar
   * @param aditionalDuration Optional | Tempo adicional para o snackbar ser exibido (em milissegundos)
   * @returns void
   */
  public success(message: string, aditionalDuration?: number): void {

    const finalClass = `snackbar-success`;
    this._show(message, 
      this._generateConfig(finalClass, aditionalDuration) as MatSnackBarConfig);
  }

  /**
   * @method error | Notificação de erro padrão do sistema
   * @param message Mensagem a ser exibida no snackbar
   * @param aditionalDuration Optional | Tempo adicional para o snackbar ser exibido (em milissegundos)
   * @returns void
   */
  public error(message: string, aditionalDuration?: number): void {

    const finalClass = `snackbar-error`;
    this._show(message, 
      this._generateConfig(finalClass, aditionalDuration) as MatSnackBarConfig);
  }

  /**
   * @method warn | Notificação de alerta padrão do sistema
   * @param message Mensagem a ser exibida no snackbar
   * @param aditionalDuration Optional | Tempo adicional para o snackbar ser exibido (em milissegundos)
   * @returns void
   */
  public warn(message: string, aditionalDuration?: number): void {

    const finalClass = `snackbar-warning`;
    this._show(message, 
      this._generateConfig(finalClass, aditionalDuration) as MatSnackBarConfig);
  }

  // Private methods-------------------------------------------------------------

  private _show = (message: string, config: MatSnackBarConfig) => 
    this.snackBar.open(message, this._dismissIcon, config);

  private _generateConfig = (panelClass?: string, duration?: number) => 
  ({
    ...this._config,
    duration: this._calcDuration(duration),
    panelClass: this._generateCssClass(panelClass)
  });

  private _calcDuration = (aditional?: number) => 
    aditional ? (this._defaultDuration + aditional) : this._defaultDuration;

  private _generateCssClass = (aditionalClass?: string) => 
    aditionalClass ? [this._baseClass, aditionalClass] : this._baseClass;

}
