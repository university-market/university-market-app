import { Component, OnInit } from '@angular/core';
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

  constructor(private gridService: GridCoursesService) { }

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
        e.cols = this.columns
        e.rows = 1})
    }
  }

  courseSearch(id: number){
    window.location.assign('http://localhost:3000/post?course_id=' + id)
  }
}
