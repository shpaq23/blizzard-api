import { Component, OnInit } from '@angular/core';
import {AuthService} from '../api/services/auth.service';
import {Router} from '@angular/router';
import {AuthState} from '../store/state/auth.state';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getError} from '../store/selectors/auth.selectors';
import {GetToken} from '../store/actions/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  error$: Observable<string>;
  constructor(private authService: AuthService,
              private router: Router,
              private authStore: Store<AuthState>) { }

  ngOnInit() {
    this.error$ = this.authStore.pipe(select(getError));
    this.authStore.dispatch(new GetToken());
  }

}
