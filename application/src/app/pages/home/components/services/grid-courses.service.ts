import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tile } from '../models/grid-courses.mode';

@Injectable({
  providedIn: 'root'
})
export class GridCoursesService {

private baseUrl = 'http://localhost:9090/course/grid'

constructor(private http : HttpClient) { }

  onInit(): Observable<Tile[]>{
    return this.http.get<Tile[]>(this.baseUrl)
  }

}
