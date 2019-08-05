import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WowRoutingModule } from './wow-routing.module';
import { MountsComponent } from './mounts/mounts.component';
import { WowComponent } from './wow.component';
import {MatButtonModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {wowReducer} from '../store/reducers/wow.reducers';
import {spinnerReducer} from '../store/reducers/spinner.reducers';
import {EffectsModule} from '@ngrx/effects';
import {SpinnerEffects} from '../store/effects/spinner.effects';
import {WowEffects} from '../store/effects/wow.effects';


@NgModule({
  declarations: [MountsComponent, WowComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('wow', wowReducer),
    StoreModule.forFeature('spinner', spinnerReducer),
    EffectsModule.forFeature([WowEffects, SpinnerEffects]),
    WowRoutingModule,
    MatButtonModule
  ]
})
export class WowModule { }
