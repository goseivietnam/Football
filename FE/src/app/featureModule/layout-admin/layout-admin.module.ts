import { CommonModule } from '@angular/common';
import { LayoutAdminComponent } from './layout-admin.component';
import { LayoutAdminRoutingModule } from './layout-admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LayoutAdminComponent],
  imports: [CommonModule, LayoutAdminRoutingModule, MatTableModule],
})
export class LayoutAdminModule {}
