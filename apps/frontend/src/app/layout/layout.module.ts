import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutRoutingModule } from './layout-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';


@NgModule({
  declarations: [SidebarComponent, ContentLayoutComponent],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    NgOptimizedImage,
  ],
  exports: [SidebarComponent, ContentLayoutComponent],
})
export class LayoutModule {}
