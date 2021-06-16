import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleModel } from '../models/sale-model';

const baseUrl = 'http://localhost:9090/publicacao/listar'

@Injectable()
export class SaleHomeListService {

constructor(private http: HttpClient) { }

    listSale(): Observable<[SaleModel]>{
        return this.http.get<[SaleModel]>(baseUrl)
    }

}
