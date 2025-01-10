import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ReceivablesComponent } from './receivables.component';

const routes: Routes = [{ path: '', component: ReceivablesComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivablesRoutingModule {}
