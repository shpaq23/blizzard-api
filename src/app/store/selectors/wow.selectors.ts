import {createFeatureSelector, createSelector} from '@ngrx/store';
import {WowState} from '../state/wow.state';

const getWowFeatureState = createFeatureSelector<WowState>('wow');

export const getMountList = createSelector(
  getWowFeatureState,
  state => state.mountState.mounts
);
export const getMount = (id: number) => createSelector(
  getWowFeatureState,
  (state) =>
    state.mountState.mounts.find(mount => mount.id === id) || null
);
export const getError = createSelector(
  getWowFeatureState,
  state => state.mountState.error
);
export const getLoaded = createSelector(
  getWowFeatureState,
  state => state.mountState.loaded
);
