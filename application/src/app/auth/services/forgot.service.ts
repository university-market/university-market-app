import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotModel } from '../models/forgot.model';

@Injectable()
export class ForgotService {

  private baseUrl = 'http://localhost:3000/forgot'

  constructor(private http: HttpClient) { }

  doRecover(forgot : ForgotModel): Observable<ForgotModel> {
    return this.http.post<ForgotModel>(this.baseUrl, forgot)
    
  }
}
