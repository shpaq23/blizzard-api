import {MountList} from '../../api/services/wow.service';

export interface WowState {
  mounts: MountList[];
  error: string;
}
export const initialWowState: WowState = {
  mounts: [],
  error: ''
};
