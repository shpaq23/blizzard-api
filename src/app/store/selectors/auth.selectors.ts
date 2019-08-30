import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from '../state/auth.state';

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuth = createSelector(
  getAuthFeatureState,
  state => state.auth
);
export const getError = createSelector(
  getAuthFeatureState,
  state => state.error
);
export const getLoading = createSelector(
  getAuthFeatureState,
  state => state.loading
);
