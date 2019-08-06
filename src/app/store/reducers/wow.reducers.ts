import {initialWowState, WowState} from '../state/wow.state';
import {WowActions, WowActionsTypes} from '../actions/wow.actions';

export function wowReducer(state = initialWowState, action: WowActions): WowState {
  switch (action.type) {
    case WowActionsTypes.GetMountListSuccess:
      return {
        ... state,
        mountState: {... state.mountState,
          mounts: action.payload,
          error: '',
          loaded: true
        }
      };
    case WowActionsTypes.GetMountListFail:
      return {
        ... state,
        mountState: {... state.mountState,
          error: action.payload,
        }
      };
    default:
      return state;
  }
}
