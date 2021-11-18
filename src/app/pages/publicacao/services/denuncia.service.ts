import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicacaoDenunciaModel } from '../models/publicacao-denuncia.model';
import { TipoDenunciaModel } from '../models/tipos-denuncias-model';


@UntilDestroy()
@Injectable()
export class DenunciaService {

  constructor(private http: HttpClient) { }

  
  public denunciar(model: PublicacaoDenunciaModel){
    return this.http.post<PublicacaoDenunciaModel>(environment.apiUrl + environment.publicacao + `/denunciar`,model);
  }

  public obterTipoDenuncias():Observable<TipoDenunciaModel[]>{
      return this.http.get<TipoDenunciaModel[]>(environment.apiUrl + environment.publicacao + `/obter/tiposDenuncias`)
  }

}
