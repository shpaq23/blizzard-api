import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WowRoutingModule } from './wow-routing.module';
import { MountsComponent } from './mounts/mounts.component';
import { WowComponent } from './wow.component';


@NgModule({
  declarations: [MountsComponent, WowComponent],
  imports: [
    CommonModule,
    WowRoutingModule
  ]
})
export class WowModule { }
