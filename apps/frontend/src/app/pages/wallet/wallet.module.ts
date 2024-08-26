import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { WalletRoutingModule } from './wallet-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule,
    MatIconModule,
    WalletRoutingModule,
   MatGridListModule
  ]
})
export class WalletModule { }
