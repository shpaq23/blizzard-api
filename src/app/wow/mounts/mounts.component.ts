import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {WowState} from '../../store/state/wow.state';
import {SpinnerState} from '../../store/state/spinner.state';
import {getError} from '../../store/selectors/auth.selectors';
import {isSpinnerShowing} from '../../store/selectors/spinner.selectors';
import {GetMountList} from '../../store/actions/wow.actions';

@Component({
  selector: 'app-mounts',
  templateUrl: './mounts.component.html',
  styleUrls: ['./mounts.component.scss']
})
export class MountsComponent implements OnInit {

  error$: Observable<string>;
  spinner$: Observable<boolean>;
  constructor(private wowStore: Store<WowState>,
              private spinnerStore: Store<SpinnerState>) { }

  ngOnInit() {
    this.error$ = this.wowStore.pipe(select(getError));
    this.spinner$ = this.spinnerStore.pipe(select(isSpinnerShowing));
    this.wowStore.dispatch(new GetMountList());
  }

}
