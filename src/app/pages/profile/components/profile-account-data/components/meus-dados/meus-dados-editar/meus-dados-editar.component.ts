import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeyValuePair } from 'src/app/base/data-types/key-value-pair';

@Component({
  selector: 'app-meus-dados-editar',
  templateUrl: './meus-dados-editar.component.html',
  styleUrls: ['./meus-dados-editar.component.scss']
})
export class MeusDadosEditarComponent implements OnInit {

  public form: FormGroup = null;
  public triedSave$ = new BehaviorSubject<boolean>(false);

   // Dados necessários para formulário
   public instituicaoList$: Observable<KeyValuePair<number, string>[]> = null;
   public cursosList$: Observable<KeyValuePair<number, string>[]> = null
  constructor() { }

  ngOnInit() {
  }

}
