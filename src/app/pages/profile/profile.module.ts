import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityMarketBaseModule } from 'src/app/base/university-market-base.module';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';
import { ProfileConfigComponent } from './components/profile-config/profile-config.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ProfilePublicacoesComponent } from './components/profile-publicacoes/profile-publicacoes.component';
import { ProfileAccountDataComponent } from './components/profile-account-data/profile-account-data.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ProfilePublicacoesHeaderComponent } from './components/profile-publicacoes/profile-publicacoes-header/profile-publicacoes-header.component';
import { ProfilePublicacaoItemComponent } from './components/profile-publicacoes/profile-publicacao-item/profile-publicacao-item.component';
import { PublicacoesExcluirComponent } from './components/profile-publicacoes/publicacoes-excluir/publicacoes-excluir.component';
import { MeusContatosComponent } from './components/profile-account-data/components/meus-contatos/meus-contatos.component';
import { MeusDadosComponent } from './components/profile-account-data/components/meus-dados/meus-dados.component';
import { MeusEnderecosComponent } from './components/profile-account-data/components/meus-enderecos/meus-enderecos.component';
import { ContatosActionsComponent } from './components/profile-account-data/components/meus-contatos/contatos-actions/contatos-actions.component';
import { MeusDadosEditarComponent } from './components/profile-account-data/components/meus-dados/meus-dados-editar/meus-dados-editar.component';

@NgModule({
  imports: [
    CommonModule,
    UniversityMarketBaseModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    ProfileUserComponent,
    ProfileConfigComponent,
    ProfilePublicacoesComponent,
    ProfileAccountDataComponent,
    ProfileContentComponent,
    ProfilePublicacoesHeaderComponent,
    ProfilePublicacaoItemComponent,
    PublicacoesExcluirComponent,
    MeusContatosComponent,
    MeusDadosComponent,
    MeusEnderecosComponent,
    ContatosActionsComponent,
    MeusDadosEditarComponent
  ],
   providers: [ProfileService]
})
export class ProfileModule { }
