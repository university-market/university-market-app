import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { scan } from 'rxjs/operators';

export enum TipoPesquisa {
  pesquisa = 1,
  curso = 2
};

@Component({
  selector: 'app-publicacao-search-list',
  templateUrl: './publicacao-search-list.component.html',
  styleUrls: ['./publicacao-search-list.component.scss']
})
export class PublicacaoSearchListComponent implements OnInit {

  public pesquisa$ = new ReplaySubject<string>();
  public cursoId$ = new ReplaySubject<number>();
  public tipo_pesquisa = new ReplaySubject<TipoPesquisa>();

  public tipo_pesquisa$ = this.tipo_pesquisa.asObservable()
    .pipe(
      scan((previous, next) => next)
    );

  pesquisa: string;
  cursoId: number;
  result: number;

  constructor (
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams
      .subscribe(params => {

        if (params['pesquisa'] || params['curso']) {

          this.pesquisa$.next(params['pesquisa'] ?? params['curso']);
          this.tipo_pesquisa.next(TipoPesquisa.pesquisa);
        }

        if (params['cursoId']) {

          this.cursoId$.next(params['cursoId']);
          this.tipo_pesquisa.next(TipoPesquisa.curso);
        }
      });
  }
}
