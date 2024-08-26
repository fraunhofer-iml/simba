import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    ProductionComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    ProductionRoutingModule
  ]
})
export class ProductionModule { }
