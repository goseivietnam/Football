import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutClientRoutingModule } from './layout-client-routing.module';
import { LayoutClientComponent } from './layout-client.component';


@NgModule({
  declarations: [
    LayoutClientComponent
  ],
  imports: [
    CommonModule,
    LayoutClientRoutingModule
  ]
})
export class LayoutClientModule { }
