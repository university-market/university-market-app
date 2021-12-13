import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PublicacaoContatosModel } from '../../models/publicacao-contatos.model';
import { PublicacaoService } from '../../services/publicacao.service';

@Component({
  selector: 'app-publicacao-detalhe-contato',
  templateUrl: './publicacao-detalhe-contato.component.html',
  styleUrls: ['./publicacao-detalhe-contato.component.scss']
})
export class PublicacaoDetalheContatoComponent implements OnInit {

  contatos: PublicacaoContatosModel[];

  constructor (
    private _bottomSheetRef: MatBottomSheetRef<PublicacaoDetalheContatoComponent>,
    private service: PublicacaoService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {id:number,
                                                titulo: string}
  ) { }

  ngOnInit() { 
    this.service.obterContatos(this.data.id)
      .subscribe(contatos => {
        this.contatos = contatos
        console.log(this.data.titulo)
      })
    
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    // event.preventDefault();
  }

}
