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
    {curso: 'Arquitetura e Urbanismo', cols: 2, rows: 2, color: 'lightblue'},
    {curso: 'Engenharia Civil', cols: 1, rows: 1, color: 'lightblue'},
    {curso: 'Medicina', cols: 1, rows: 2, color: 'lightblue'},
    {curso: 'Pedagogia', cols: 1, rows: 2, color: 'lightblue'},
    {curso: 'Psicologia', cols: 1, rows: 1, color: 'lightblue'},
    {curso: 'Ciência da Computação', cols: 1, rows: 1, color: 'lightblue'},
    {curso: 'Gastronomia', cols: 1, rows: 1, color: 'lightblue'},
  ];

  columns: number = 4;

  constructor(private route : Router) { }

  ngOnInit() { 
    console.log(this.itens)
  }
  setColumn(width: number){
    if(width < 1000){
      this.columns = 3;
      this.itens.forEach(e =>  {
        e.cols = this.columns
        e.rows = 1})
    }
    // if(width > 1000){
    //   this.columns = 4
    //   this.gridService.onInit().subscribe(tiles => {
    //     this.tiles = tiles
    //     console.log(tiles)
    //   })
    // }
  }

  // courseSearch(id: number){
  //   this.route.navigate(['/sales/course/'+ id]);
  // }
}
