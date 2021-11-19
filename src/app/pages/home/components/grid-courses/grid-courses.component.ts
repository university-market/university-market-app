import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridItem } from '../models/grid-item.model';

@Component({
  selector: 'app-grid-courses',
  templateUrl: './grid-courses.component.html',
  styleUrls: ['./grid-courses.component.scss']
})
export class GridCoursesComponent implements OnInit {
  
  itens: GridItem[] = [
    {curso: 'Arquitetura e Urbanismo', cols: 2, rows: 2, img: 'https://inscricaoucb.catolica.edu.br/hubfs/Imported_Blog_Media/arquitetura%20ucb-844163-edited.jpg'},
    {curso: 'Engenharia Civil', cols: 1, rows: 1, img: 'https://www.unicesumar.edu.br/blog/wp-content/uploads/2018/01/engenharia-civil.jpg'},
    {curso: 'Medicina', cols: 1, rows: 2, img: 'https://medicina.ucpel.edu.br/wp-content/uploads/2020/03/apacucpel_ucpel_image_36-1024x682.jpeg'},
    {curso: 'Gastronomia', cols: 1, rows: 2, img: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/78/15/c0/20161030-130822-largejpg.jpg'},
    {curso: 'Psicologia', cols: 1, rows: 1, img: 'https://blog.cognitivo.com/wp-content/uploads/2019/11/312506-afinal-como-esta-o-mercado-de-trabalho-na-psicologia.jpg'},
    {curso: 'Ciência da Computação', cols: 1, rows: 1, img: 'http://flf.edu.br/web/app/uploads/ciencia-da-computacao-principal.jpg'},
    {curso: 'Odontologia', cols: 1, rows: 1, img: 'https://blog.unyleya.edu.br/wp-content/uploads/2019/01/264683-ja-pensou-em-comecar-uma-especializacao-em-odontologia-confira-x-areas.jpg'},
  ];

  itensResize: GridItem[];

  columns: number = 4;

  constructor(private route : Router) { }

  ngOnInit() { 

    window.onresize = () => {
      const width = window.innerWidth;
      this.setColumn(width);
    }

  }
  setColumn(width: number){
    if(width < 1000){
      this.columns = 3;
      this.itensResize = this.itens
      this.itens.forEach(e =>  {
        e.cols = this.columns
        e.rows = 1})
    }
    if(width > 1000){
      this.columns = 4
      this.itens = [
        {curso: 'Arquitetura e Urbanismo', cols: 2, rows: 2, img: 'https://inscricaoucb.catolica.edu.br/hubfs/Imported_Blog_Media/arquitetura%20ucb-844163-edited.jpg'},
        {curso: 'Engenharia Civil', cols: 1, rows: 1, img: 'https://www.unicesumar.edu.br/blog/wp-content/uploads/2018/01/engenharia-civil.jpg'},
        {curso: 'Medicina', cols: 1, rows: 2, img: 'https://medicina.ucpel.edu.br/wp-content/uploads/2020/03/apacucpel_ucpel_image_36-1024x682.jpeg'},
        {curso: 'Gastronomia', cols: 1, rows: 2, img: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/78/15/c0/20161030-130822-largejpg.jpg'},
        {curso: 'Psicologia', cols: 1, rows: 1, img: 'https://blog.cognitivo.com/wp-content/uploads/2019/11/312506-afinal-como-esta-o-mercado-de-trabalho-na-psicologia.jpg'},
        {curso: 'Ciência da Computação', cols: 1, rows: 1, img: 'http://flf.edu.br/web/app/uploads/ciencia-da-computacao-principal.jpg'},
        {curso: 'Odontologia', cols: 1, rows: 1, img: 'https://blog.unyleya.edu.br/wp-content/uploads/2019/01/264683-ja-pensou-em-comecar-uma-especializacao-em-odontologia-confira-x-areas.jpg'},
      ];

    }
  }

  // courseSearch(id: number){
  //   this.route.navigate(['/sales/course/'+ id]);
  // }
}
