import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthTokenInterceptor} from './api/interceptors/auth-token-interceptor';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {UnauthorizedInterceptor} from './api/interceptors/unauthorized-interceptor';
import {WowModule} from './wow/wow.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {_MatMenuDirectivesModule, MatButtonModule, MatFormFieldModule, MatMenuModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Blizzard API',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    AuthModule,
    WowModule,
    AppRoutingModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
