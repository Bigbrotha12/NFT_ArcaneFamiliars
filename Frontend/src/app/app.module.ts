import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app-layout/app-layout.module';
import { LandingLayoutModule } from './layout/landing-layout/landing-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialsModule } from './materials/materials.module';
import { IMXqueryService } from './services/imxquery.service';
import { Web3queryService } from './services/web3query.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppLayoutModule,
    LandingLayoutModule,
    MaterialsModule
  ],
  providers: [
    IMXqueryService,
    Web3queryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
