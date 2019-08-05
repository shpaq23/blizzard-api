import {Action} from '@ngrx/store';

export enum SpinnerActionsTypes {
  ShowSpinner = '[Spinner] Show Spinner',
  HideSpinner = '[Spinner] Hide Spinner'
}
export class ShowSpinner implements Action {
  public readonly type = SpinnerActionsTypes.ShowSpinner;
}
export class HideSpinner implements Action {
  public readonly type = SpinnerActionsTypes.HideSpinner;
}
export type SpinnerActions = ShowSpinner | HideSpinner;
