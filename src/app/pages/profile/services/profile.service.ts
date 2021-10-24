import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MeusDadosUserModel } from '../models/meus-dados-user.model';
import { ProfilePublicacoesModel } from '../models/profile-publicacaoes.model';
import { PerfilUserModel } from '../models/profile-user.model';


const API_URL = environment.apiUrl ;

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  searchUserById(id: number):Observable<PerfilUserModel>{
    return this.http.get<PerfilUserModel>(API_URL + environment.estudante + `/dados/${id}`);
  }

  searchPublibyUser(id:number): Observable<ProfilePublicacoesModel[]>{
    return this.http.get<ProfilePublicacoesModel[]>(API_URL + environment.publicacao + `/estudante/${id}`);
  }

  deletePublicacao(id:number){
   return this.http.delete(API_URL + environment.publicacao + `/${id}`);
  }

  DadosUserbyId(id:number): Observable<MeusDadosUserModel>{
    return this.http.get<MeusDadosUserModel>(API_URL + environment.estudante + `/${id}`);
  }
}
