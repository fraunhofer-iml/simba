import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ProductionComponent } from './production.component';

const routes: Routes = [{ path: '', component: ProductionComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {}
