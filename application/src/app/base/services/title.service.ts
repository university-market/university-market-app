import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { applicationName } from 'src/app/core/static/application-name';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private _defaultApplicationTitle: string;

  private _tabBrowserHistory: string[] = [];
  private get history() {
    return this._tabBrowserHistory;
  }

  constructor(private title: Title) {

    this._defaultApplicationTitle = applicationName;
  }

  /**
   * Get the browser platform title (current or default)
   * @method get
   * @param {boolean} current Without arguments (true), gets the browser current title
   * @param {boolean} current If false, get the application default title
   * @returns {string} A title (current or default)
   */
  public get(current: boolean = true): string {
    return current ? this._get() : this._defaultApplicationTitle;
  }
  
  /**
   * Set a new title for the browser tab
   * @method set
   * @param {string} newTitle New title that will be defined into current browser tab
   * @returns {void} void
   */
  public set(newTitle: string): void {
    this._set(newTitle);
  }
  
  /**
   * Reset the browser tab title to default of application
   * @method reset
   * @returns {void} void
   */
  public reset(): void {
    this._reset();
  }
  
  /**
   * Gets the history stored in application memory
   * @method getHistory
   * @param {string} sentence An slice of a string to be searched in the titles history
   * @returns All registers or registers that match with the sentence provided in argument
   */
  public getHistory(sentence?: string): string | string[] {
    
    const response = sentence ? this._filterHistory(sentence) : this.history;
    return sentence && response.length == 1 ? response[0] : response;
  }

  private _get = () => this.title.getTitle();
  
  private _set = (title: string) => this.title.setTitle(title);

  private _reset = () => this._set(this._defaultApplicationTitle);

  private _filterHistory(sentence: string): string[] {
    
    return this._tabBrowserHistory.filter(t => t.indexOf(sentence) != -1).slice();
  }

}
