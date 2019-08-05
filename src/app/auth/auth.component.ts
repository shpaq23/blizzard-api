import { Component, OnInit } from '@angular/core';
import {AuthState} from '../store/state/auth.state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getError} from '../store/selectors/auth.selectors';
import {GetToken} from '../store/actions/auth.actions';
import {SpinnerState} from '../store/state/spinner.state';
import {isSpinnerShowing} from '../store/selectors/spinner.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  error$: Observable<string>;
  spinner$: Observable<boolean>;
  constructor(private authStore: Store<AuthState>,
              private spinnerStore: Store<SpinnerState>) { }

  ngOnInit() {
    this.error$ = this.authStore.pipe(select(getError));
    this.spinner$ = this.spinnerStore.pipe(select(isSpinnerShowing));
    this.authStore.dispatch(new GetToken());
  }

}
