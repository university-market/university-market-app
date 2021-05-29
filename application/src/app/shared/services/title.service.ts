import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DEFAULT_APP_TITLE } from '../const/default-consts';

@Injectable()
export class TitleService {

  private _defaultApplicationTitle: string;

  private _tabBrowserHistory: string[] = [];
  private get history() {
    return this._tabBrowserHistory;
  }

  constructor(private title: Title) {

    this._defaultApplicationTitle = DEFAULT_APP_TITLE;
  }

  /**
   * @method get - Get the browser platform title (current or default)
   * @param current If true (without arguments), obtain the current browser title
   * @param current If false, get the application default title
   * @returns A title (current or default)
   */
  public get(current: boolean = true): string {
    return current ? this._get() : this._defaultApplicationTitle;
  }

  /**
   * @method set - Set a new title for the browser tab
   * @param newTitle New title that will be defined in the the current browser tab
   * @returns void
   */
  public set(newTitle: string): void {
    if (!this._tabBrowserHistory.some(t => t.indexOf(newTitle) != -1))
      this._tabBrowserHistory.push(newTitle);

    this._set(newTitle);
  }

  /**
   * @method reset - Reset the browser tab title
   * @description Should be called in the component ngOnDestroy method
   * @returns void
   */
  public reset(): void {
    this._reset();
  }

  /**
   * @method getHistory - Gets the history stored in application memory
   * @param sentence An slice of a string to be searched in the titles history
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
