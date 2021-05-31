import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tile } from '../models/grid-courses.mode';
import { GridCoursesService } from '../services/grid-courses.service';

@Component({
  selector: 'app-grid-courses',
  templateUrl: './grid-courses.component.html',
  styleUrls: ['./grid-courses.component.scss']
})
export class GridCoursesComponent implements OnInit {
  
  tiles: Tile[];

  columns: number = 4;

  constructor(private gridService: GridCoursesService,
              private route : Router) { }

  ngOnInit() {

    this.gridService.onInit().subscribe(tiles => {
      this.tiles = tiles
      console.log(tiles)
    })

    window.onresize = () => {
      const width = window.innerWidth;
      this.setColumn(width);
    }
  }

  setColumn(width: number){
    if(width < 1000){
      this.columns = 3;
      this.tiles.forEach(e =>  {
        e.grid_cols = this.columns
        e.grid_rows = 1})
    }
    if(width > 1000){
      this.columns = 4
      this.gridService.onInit().subscribe(tiles => {
        this.tiles = tiles
        console.log(tiles)
      })
    }
  }

  courseSearch(id: number){
    this.route.navigate(['/list/course/'+ id]);
  }
}
