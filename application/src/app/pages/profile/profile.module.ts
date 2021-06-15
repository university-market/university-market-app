import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';
import { ProfileConfigComponent } from './profile-config/profile-config.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    ProfileConfigComponent,
    ProfileUserComponent
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
