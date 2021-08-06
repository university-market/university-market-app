import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateBaseComponent } from './template-base.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateBaseComponent,
    loadChildren: () => import("../../pages/pages.module").then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TemplateBaseRoutingModule { }