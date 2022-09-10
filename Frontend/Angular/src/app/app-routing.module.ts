import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { GameComponent } from './components/game/game.component';
import { BodyComponent } from './components/body/body.component';

const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent
  },
  {
    path: "app",
    component: AppLayoutComponent
  },
  {
    path: "game",
    component: GameComponent,
    outlet: "app"
  },
  {
    path: "body",
    component: BodyComponent,
    outlet: "app"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
