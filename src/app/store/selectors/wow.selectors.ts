import {createFeatureSelector, createSelector} from '@ngrx/store';
import {WowState} from '../state/wow.state';

const getWowFeatureState = createFeatureSelector<WowState>('wow');

export const getMountList = createSelector(
  getWowFeatureState,
  state => state.mounts
);
