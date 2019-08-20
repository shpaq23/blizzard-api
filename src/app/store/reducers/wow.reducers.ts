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
    case WowActionsTypes.GetMountDetailsSuccess:
    case WowActionsTypes.GetMountDetailsFail:
      const index = state.mountState.mounts.findIndex(row => row.id === action.payload.id);
      const mountStateCopy = [... state.mountState.mounts];
      mountStateCopy[index] = action.payload;
      return {
        ... state,
        mountState: {... state.mountState,
          mounts: [... mountStateCopy]
        }
      };
    case WowActionsTypes.GetPetListSuccess:
      return {
        ...state,
        petState: {
         ...state.petState,
          pets: action.payload,
          error: '',
          loaded: true
        }
      };
    case WowActionsTypes.GetPetListFail:
      return  {
        ...state,
        petState: {
          ...state.petState,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
