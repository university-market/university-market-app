import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleModel } from '../models/sale-model';

const baseUrl = 'http://localhost:9090/sale'

@Injectable()
export class SaleListService {

constructor(private http: HttpClient) { }

    listSaleByCourseId(id: number): Observable<SaleModel[]>{
        const url = baseUrl+'/list/'+id
        return this.http.get<SaleModel[]>(url)
    }

}
