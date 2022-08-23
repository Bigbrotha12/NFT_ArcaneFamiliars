import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutComponent } from './app-layout.component';

import { MaterialsModule } from 'src/app/materials/materials.module';

@NgModule({
  declarations: [
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class AppLayoutModule { }
