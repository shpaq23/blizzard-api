import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {authReducer} from './auth.reducers';
import {spinnerReducer} from './spinner.reducers';

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  spinner: spinnerReducer
};
