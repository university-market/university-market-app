import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfilePublicacoesModel } from '../models/profile-publicacaoes.model';
import { UserModel } from '../models/profile-user.model';


const API_URL = environment.apiUrl ;

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  searchUserById(id: number):Observable<UserModel>{
    return this.http.get<UserModel>(API_URL + environment.estudante + `/${id}`)
  }

  searchPublibyUser(id:number): Observable<ProfilePublicacoesModel[]>{
    return this.http.get<ProfilePublicacoesModel[]>(API_URL + environment.publicacao + `/estudante/${id}`)
  }
}
