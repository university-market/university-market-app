import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("../app/pages/pages.module").then(m => m.PagesModule)
  }, {
    path: 'auth',
    loadChildren: () => import("../app/auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
