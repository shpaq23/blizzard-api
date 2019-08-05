import {Injectable} from '@angular/core';
import {AuthService} from '../../api/services/auth.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {AuthActionsTypes, GetTokenFail, GetTokenSuccess} from '../actions/auth.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(private authService: AuthService,
              private actions$: Actions,
              private router: Router) {}
  @Effect()
  getToken: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionsTypes.GetToken),
    mergeMap(() => this.authService.authorize().pipe(
      map(authResponse => {
        localStorage.setItem('auth', JSON.stringify(authResponse));
        this.router.navigate(['']);
        return new GetTokenSuccess(authResponse);
      }),
      catchError(err => of(new GetTokenFail(err)))
    )));

}
