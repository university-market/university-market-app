import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from './base/guards/navigation.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("../app/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [NavigationGuard],
    loadChildren: () => import("../app/template/template.module").then(m => m.TemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [NavigationGuard]
})
export class AppRoutingModule { }
