import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-esqueci-minha-senha-dialog',
  templateUrl: './esqueci-minha-senha-dialog.component.html',
  styleUrls: ['./esqueci-minha-senha-dialog.component.scss']
})
export class EsqueciMinhaSenhaDialogComponent implements OnInit {

  public form: FormGroup = null;

  public triedSave$ = new BehaviorSubject<boolean>(false);

  constructor (private ref: MatDialogRef<EsqueciMinhaSenhaDialogComponent>) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email])
    });
  }

  // Função para realizar a recuperação de senha
  onEnviar(){

    const email = this.form.get('email')?.value;

    if(!email || this.form.invalid) {
      
      this.form.markAllAsTouched();
      this.triedSave$.next(true);

      return;
    }

    this.ref.close(email);
  }

}
