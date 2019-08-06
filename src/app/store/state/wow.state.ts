import {MountList} from '../../api/services/wow.service';

export interface WowState {
  mountState: {
    mounts: MountList[],
    loaded: boolean
    error: string;
  };
}
export const initialWowState: WowState = {
  mountState: {
    mounts: [],
    loaded: false,
    error: ''
  },
};
