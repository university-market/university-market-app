import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from './base/guards/navigation.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [NavigationGuard],
    loadChildren: () => import("../app/base/template/template-base.module").then(m => m.TemplateBaseModule)
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
