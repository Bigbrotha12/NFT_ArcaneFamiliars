import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialsModule } from './materials/materials.module';
import { IMXqueryService } from './services/imxquery.service';
import { Web3queryService } from './services/web3query.service';
import { LandingPComponent } from './pages/landing-p/landing-p.component';
import { AppPComponent } from './pages/app-p/app-p.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarComponent,
    MainComponent,
    LandingPComponent,
    AppPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  providers: [
    IMXqueryService,
    Web3queryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
