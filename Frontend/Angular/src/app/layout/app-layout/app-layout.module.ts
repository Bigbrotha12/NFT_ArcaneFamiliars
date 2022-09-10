import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutComponent } from './app-layout.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BodyComponent } from 'src/app/components/body/body.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { GameComponent } from 'src/app/components/game/game.component';
import { PlaceholderComponent } from 'src/app/components/placeholder/placeholder.component';

import { MaterialsModule } from 'src/app/materials/materials.module';
import { IMXqueryService } from 'src/app/services/imxquery.service';

@NgModule({
  declarations: [
    AppLayoutComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    GameComponent,
    PlaceholderComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  exports: [
    AppLayoutComponent
  ],
  providers: [
    IMXqueryService
  ]
})
export class AppLayoutModule { }
