import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Injectable()
export class PublicacaoService {

  private _isEdicao = new BehaviorSubject<boolean>(false);
  public isEdicao$ = this._isEdicao.asObservable();

  private _publicacaoId = new BehaviorSubject<number>(0);
  public publicacaoId$ = this._publicacaoId.asObservable();

  constructor() { }

  public init(publicacaoId: number): void {

    if (isNaN(publicacaoId))
      return this._isEdicao.next(false);
    
    this._isEdicao.next(true);
    this._publicacaoId.next(publicacaoId);
  }

}
