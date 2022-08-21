import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPComponent } from './pages/app-p/app-p.component';
import { LandingPComponent } from './pages/landing-p/landing-p.component';

const routes: Routes = [
  {
    path: "",
    component: LandingPComponent
  },
  {
    path: "/app",
    component: AppPComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
