import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tile } from '../models/grid-courses.mode';

const API_URL = environment.apiUrl + environment.curso;

@Injectable()
export class GridCoursesService {

  constructor(private http : HttpClient) { }

  onInit(): Observable<Tile[]>{
    return this.http.get<Tile[]>(API_URL + '/grid');
  }

}
