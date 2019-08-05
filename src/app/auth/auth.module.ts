import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {authReducer} from '../store/reducers/auth.reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../store/effects/auth.effects';
import {spinnerReducer} from '../store/reducers/spinner.reducers';
import {SpinnerEffects} from '../store/effects/spinner.effects';
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('spinner', spinnerReducer),
    EffectsModule.forFeature([AuthEffects, SpinnerEffects]),
    AuthRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ]
})
export class AuthModule { }
