import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaleModel } from '../models/sale-model';

const API_URL = environment.apiUrl + environment.publicacao;

@Injectable()
export class SaleHomeListService {

constructor(private http: HttpClient) { }

    listSale(): Observable<[SaleModel]>{
      return this.http.get<[SaleModel]>(API_URL + '/listar');
    }

}
