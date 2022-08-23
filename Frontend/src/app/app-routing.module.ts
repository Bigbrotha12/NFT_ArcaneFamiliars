import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: "",
    component: LandingLayoutComponent
  },
  {
    path: "app",
    component: AppLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
