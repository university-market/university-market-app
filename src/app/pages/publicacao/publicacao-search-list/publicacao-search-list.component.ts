import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publicacao-search-list',
  templateUrl: './publicacao-search-list.component.html',
  styleUrls: ['./publicacao-search-list.component.scss']
})
export class PublicacaoSearchListComponent implements OnInit {

  pesquisa: string;
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pesquisa = this.activatedRoute.snapshot.queryParams['pesquisa'];
  }

}
