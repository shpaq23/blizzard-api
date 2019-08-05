import {AuthState} from './auth.state';
import {SpinnerState} from './spinner.state';

export interface AppState {
  auth: AuthState;
  spinner: SpinnerState;
}
