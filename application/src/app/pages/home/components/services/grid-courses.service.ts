import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tile } from '../models/grid-courses.mode';

@Injectable()
export class GridCoursesService {

  private baseUrl = environment.dev + '/course/grid';

  constructor(private http : HttpClient) { }

  onInit(): Observable<Tile[]>{
    return this.http.get<Tile[]>(this.baseUrl)
  }

}
