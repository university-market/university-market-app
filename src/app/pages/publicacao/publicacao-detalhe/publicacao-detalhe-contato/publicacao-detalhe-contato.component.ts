import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-publicacao-detalhe-contato',
  templateUrl: './publicacao-detalhe-contato.component.html',
  styleUrls: ['./publicacao-detalhe-contato.component.scss']
})
export class PublicacaoDetalheContatoComponent implements OnInit {

  constructor (
    private _bottomSheetRef: MatBottomSheetRef<PublicacaoDetalheContatoComponent>
  ) { }

  ngOnInit() { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
