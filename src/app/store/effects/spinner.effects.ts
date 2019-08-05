import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {AuthActionsTypes} from '../actions/auth.actions';
import {HideSpinner, ShowSpinner} from '../actions/spinner.actions';
import {map} from 'rxjs/operators';
import {WowActionsTypes} from '../actions/wow.actions';

const showSpinnerActions = [
  AuthActionsTypes.GetToken,
  WowActionsTypes.GetMountList,
];
const hideSpinnerActions = [
  AuthActionsTypes.GetTokenSuccess,
  AuthActionsTypes.GetTokenFail,

  WowActionsTypes.GetMountListSuccess,
  WowActionsTypes.GetMountListFail,
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
