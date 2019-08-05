import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from '../../store/state/auth.state';
import {getAuth} from '../../store/selectors/auth.selectors';
import {first, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  private ignoredUrls = [
    'https://eu.battle.net/oauth/token'
  ];
  constructor(private authStore: Store<AuthState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.ignoredUrls.includes(req.url) ? next.handle(req) :
      this.authStore.select(getAuth).pipe(
      first(),
      map(auth => auth.access_token),
      mergeMap(token => next.handle(req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }})))
    );
  }
}
