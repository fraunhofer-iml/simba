import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './wallet.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [  { path: '', component: WalletComponent }];

@NgModule({
  imports: [CommonModule , RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
