import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicacaoListagemModel } from '../../publicacao/models/publicacao-listagem.model';
import { MeusContatosModel } from '../models/meus-contatos.model';
import { MeusDadosUserModel } from '../models/meus-dados-user.model';
import { MeusEnderecosModel } from '../models/meus-enderecos.model';
import { ProfilePublicacoesModel } from '../models/profile-publicacaoes.model';
import { PerfilUserModel } from '../models/profile-user.model';


const API_URL = environment.apiUrl ;

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  //Pesquisa dados do usuário pelo id
  searchUserById(id: number):Observable<PerfilUserModel>{
    return this.http.get<PerfilUserModel>(API_URL + environment.estudante + `/dados/${id}`);
  }

  //Pesquisa publicações do usuário pelo id
  searchPublibyUser(id:number): Observable<ProfilePublicacoesModel[]>{
    return this.http.get<ProfilePublicacoesModel[]>(API_URL + environment.publicacao + `/estudante/${id}`);
  }

  //delete uma publicação do usuário
  deletePublicacao(id:number){
   return this.http.delete(API_URL + environment.publicacao + `/${id}`);
  }

  //Pesquisa todos os dados do usuário pelo id
  DadosUserbyId(id:number): Observable<MeusDadosUserModel>{
    return this.http.get<MeusDadosUserModel>(API_URL + environment.estudante + `/${id}`);
  }

  //Cadastro de contato
  cadastraContato(model: MeusContatosModel):Observable<MeusContatosModel>{
    return this.http.post<MeusContatosModel>(API_URL + environment.estudante + '/contatos', model);
  }

  //Pesquisa todos os contatos do usuário
  searchContatosByUser(id:number):Observable<MeusContatosModel[]>{
    return this.http.get<MeusContatosModel[]>(API_URL + environment.estudante + `/contatos/${id}`);
  }

  //deleta contato do usuário
  deleteContato(id: number){
    return this.http.delete(API_URL + environment.estudante + `/contatos/${id}`);
  }

  //Editar Contato do usuário
  editarContato(model: MeusContatosModel):Observable<MeusContatosModel>{
    return this.http.put<MeusContatosModel>(API_URL + environment.estudante + `/contatos`,model);
  }

   //Pesquisa todos os contatos do usuário
   searchEnderecosByUser(id:number):Observable<MeusEnderecosModel[]>{
    return this.http.get<MeusEnderecosModel[]>(API_URL + environment.estudante + `/endereco/${id}`);
  }

  //Cadastro de contato
  cadastraEndereco(model: MeusEnderecosModel):Observable<MeusEnderecosModel>{
    return this.http.post<MeusEnderecosModel>(API_URL + environment.estudante + '/endereco', model);
  }

  //deleta contato do usuário
  deleteEndereco(id: number){
    return this.http.delete(API_URL + environment.estudante + `/endereco/${id}`);
  }

  //Editar Contato do usuário
  editarEndereco(model: MeusEnderecosModel):Observable<MeusEnderecosModel>{
    return this.http.put<MeusEnderecosModel>(API_URL + environment.estudante + `/endereco`,model);
  }

  //Marcar publicacao como vendida
  marcarVendida(model:ProfilePublicacoesModel):Observable<ProfilePublicacoesModel>{
    return this.http.post<ProfilePublicacoesModel>(API_URL + environment.publicacao + `/marcarVendida`,model);
  }

  //Buscar publicações favoritas
  searchFavoritePubli(id:number): Observable<ProfilePublicacoesModel[]>{
    return this.http.get<ProfilePublicacoesModel[]>(API_URL + environment.publicacao + `/estudante/favoritas/${id}`);
  }

  //delete uma publicação favortia do usuário
  deletePublicacaoFavorita(id:number){
    return this.http.delete(API_URL + environment.publicacao + `/excluir/favorita/${id}`);
   }
}
