import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForgotModel } from '../models/forgot.model';

const API_URL = environment.apiUrl + environment.auth;

@Injectable()
export class ForgotService {

  constructor(private http: HttpClient) { }

  doRecover(forgot : ForgotModel): Observable<ForgotModel> {

    return this.http.post<ForgotModel>(API_URL + '/forgot', forgot);
  }
}
