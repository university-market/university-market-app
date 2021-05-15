import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("../app/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: '',
    // loadChildren: () => import("../app/pages/pages.module").then(m => m.PagesModule)
    loadChildren: () => import("../app/template/template.module").then(m => m.TemplateModule)
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
