import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Tile } from '../models/grid-courses.mode';

@Component({
  selector: 'app-grid-courses',
  templateUrl: './grid-courses.component.html',
  styleUrls: ['./grid-courses.component.scss']
})
export class GridCoursesComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Arquitetura', cols: 1, rows: 1,img:'https://www.caurj.gov.br/wp-content/uploads/2018/12/48370873_1156715337843150_1818609661318791168_o.jpg'},
    {text: 'Análise e Desenvolvimento', cols: 2, rows: 1,img:'http://flf.edu.br/web/app/uploads/ciencia-da-computacao-principal.jpg'},
    {text: 'Odontologia', cols: 1, rows: 2, img:'https://blog.unyleya.edu.br/wp-content/uploads/2019/01/264683-ja-pensou-em-comecar-uma-especializacao-em-odontologia-confira-x-areas.jpg'},
    {text: 'Engenharia Civil', cols: 2, rows: 1,img:'https://thorusengenharia.com.br/wp-content/uploads/2020/08/VENTILACAO_NATURAL_na-arquitetura.jpg'},
    {text: 'Direito', cols: 1, rows: 1, img:'https://s3.amazonaws.com/cambury-site/wp-content/uploads/2020/07/23153922/direito-1.png'}
  ];

  columns: number = 4;

  constructor() { }

  ngOnInit() {
    window.onresize = () => {
      const width = window.innerWidth;
      this.setColumn(width);
    }
  }

  setColumn(width: number){
    if(width < 1000){
      this.columns = 3;
      this.tiles.forEach(e =>  {
        e.cols = this.columns
        e.rows = 1})
    }
  }

  teste(){
    alert('funcionou');
  }
}
