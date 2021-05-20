import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tile } from '../models/grid-courses.mode';

@Injectable({
  providedIn: 'root'
})
export class GridCoursesService {

private baseUrl = 'http://localhost:3000/course'

constructor(private http : HttpClient) { }

  onInit(): Observable<Tile[]>{
    const Url = `${this.baseUrl}?_limit=5"`
    return this.http.get<Tile[]>(this.baseUrl)
  }

}
