import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignModule } from 'src/app/design/design.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';
import { ProfileConfigComponent } from './components/profile-config/profile-config.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ProfilePublicacoesComponent } from './components/profile-publicacoes/profile-publicacoes.component';
import { ProfileAccountDataComponent } from './components/profile-account-data/profile-account-data.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ProfilePublicacoesHeaderComponent } from './components/profile-publicacoes/profile-publicacoes-header/profile-publicacoes-header.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    DesignModule
  ],
  declarations: [
    ProfileComponent,
    ProfileUserComponent,
    ProfileConfigComponent,
    ProfilePublicacoesComponent,
    ProfileAccountDataComponent,
    ProfileContentComponent,
    ProfilePublicacoesHeaderComponent,
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
