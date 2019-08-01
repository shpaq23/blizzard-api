import {AuthResponse} from '../../api/services/auth.service';

export interface AuthState {
  auth: AuthResponse;
  error: string;
}
export const initialAuthState: AuthState = {
  auth: JSON.parse(localStorage.getItem('auth')),
  error: ''
};
