import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-publicacao-search-list',
  templateUrl: './publicacao-search-list.component.html',
  styleUrls: ['./publicacao-search-list.component.scss']
})
export class PublicacaoSearchListComponent implements OnInit {

  pesquisa: string;
  cursoId: number;
  tipo_pesquisa: number;
  result: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(event => {
      if(this.activatedRoute.snapshot.queryParams['pesquisa']){
        this.pesquisa = this.activatedRoute.snapshot.queryParams['pesquisa'];
        this.tipo_pesquisa = 1;
        // window.location.reload();
      }else{
        console.log(this.activatedRoute.snapshot.queryParams['curso'])
        this.pesquisa = this.activatedRoute.snapshot.queryParams['curso'];
        this.cursoId  = this.activatedRoute.snapshot.queryParams['cursoId']
        this.tipo_pesquisa = 2;
        // window.location.reload();
      }
    })


    if(this.activatedRoute.snapshot.queryParams['pesquisa']){
      this.pesquisa = this.activatedRoute.snapshot.queryParams['pesquisa'];
      this.tipo_pesquisa = 1;
      // window.location.reload();
    }else{
      this.pesquisa = this.activatedRoute.snapshot.queryParams['curso'];
      this.cursoId  = this.activatedRoute.snapshot.queryParams['cursoId']
      this.tipo_pesquisa = 2;
      // window.location.reload();
    }
  }
}
