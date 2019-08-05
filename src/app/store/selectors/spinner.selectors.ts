import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SpinnerState} from '../state/spinner.state';

const getSpinnerFeatureState = createFeatureSelector<SpinnerState>('spinner');

export const isSpinnerShowing = createSelector(
  getSpinnerFeatureState,
  state => state.show
);
