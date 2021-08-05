import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaleListHeaderModel } from '../models/sale-list-header-model';

const API_URL = environment.apiUrl + environment.curso;

@Injectable()
export class SaleListHeaderService {

  constructor(private http : HttpClient) { }

  obterNomeCurso(id:number): Observable<SaleListHeaderModel[]>{
    return this.http.get<SaleListHeaderModel[]>(API_URL + `/${id}`)
  }

}
