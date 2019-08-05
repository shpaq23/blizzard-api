import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {authReducer} from './auth.reducers';

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer

};
