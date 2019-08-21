import {createFeatureSelector, createSelector} from '@ngrx/store';
import {WowState} from '../state/wow.state';

const getWowFeatureState = createFeatureSelector<WowState>('wow');
// mounts
export const getMountList = createSelector(
  getWowFeatureState,
  state => state.mountState.mounts
);
export const getMount = (id: number) => createSelector(
  getWowFeatureState,
  (state) =>
    state.mountState.mounts.find(mount => mount.id === id) || null
);
export const getMountError = createSelector(
  getWowFeatureState,
  state => state.mountState.error
);
export const getMountListLoaded = createSelector(
  getWowFeatureState,
  state => state.mountState.loaded
);

// pets
export const getPetList = createSelector(
  getWowFeatureState,
  state => state.petState.pets
);
export const getPetError = createSelector(
  getWowFeatureState,
  state => state.petState.error
);
export const getPetListLoaded = createSelector(
  getWowFeatureState,
  state => state.petState.loaded
);
export const getPet = (id: number) => createSelector(
  getWowFeatureState,
  (state) =>
    state.petState.pets.find(pet => pet.id === id) || null
);
