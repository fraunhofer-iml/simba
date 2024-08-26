import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule } from '@angular/material/icon';
import {MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule
  ],
  exports:[SidebarComponent]
})
export class LayoutModule { }
