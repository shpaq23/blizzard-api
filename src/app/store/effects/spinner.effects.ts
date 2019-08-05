import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {AuthActionsTypes} from '../actions/auth.actions';
import {HideSpinner, ShowSpinner} from '../actions/spinner.actions';
import {map} from 'rxjs/operators';

const showSpinnerActions = [
  AuthActionsTypes.GetToken,
];
const hideSpinnerActions = [
  AuthActionsTypes.GetTokenSuccess,
  AuthActionsTypes.GetTokenFail,
];


@Injectable()
export class SpinnerEffects {

  constructor(private actions$: Actions) {}
  @Effect()
  showSpinner: Observable<Action> = this.actions$.pipe(
    ofType(... showSpinnerActions),
    map(() => new ShowSpinner()));
  @Effect()
  hideSpinner: Observable<Action> = this.actions$.pipe(
    ofType(... hideSpinnerActions),
    map(() => new HideSpinner()));
}
