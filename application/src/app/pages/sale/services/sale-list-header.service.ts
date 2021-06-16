import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleListHeaderModel } from '../models/sale-list-header-model';

@Injectable()
export class SaleListHeaderService {

    
private baseUrl = 'http://localhost:9090/course/'

constructor(private http : HttpClient) { }

  obterNomeCurso(id:number): Observable<SaleListHeaderModel[]>{
    return this.http.get<SaleListHeaderModel[]>(this.baseUrl + id)
  }

}
