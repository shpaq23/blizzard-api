import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {WowState} from '../../store/state/wow.state';
import {SpinnerState} from '../../store/state/spinner.state';
import {isSpinnerShowing} from '../../store/selectors/spinner.selectors';
import {GetMountList} from '../../store/actions/wow.actions';
import {getMountListLoaded, getMountList, getMountError} from '../../store/selectors/wow.selectors';
import {MountList} from '../../api/services/wow.service';

@Component({
  selector: 'app-mounts',
  templateUrl: './mounts.component.html',
  styleUrls: ['./mounts.component.scss']
})
export class MountsComponent implements OnInit {

  error$: Observable<string>;
  spinner$: Observable<boolean>;
  mountList$: Observable<MountList[]>;
  loaded: boolean;

  constructor(private wowStore: Store<WowState>,
              private spinnerStore: Store<SpinnerState>) { }

  ngOnInit() {
    this.error$ = this.wowStore.pipe(select(getMountError));
    this.mountList$ = this.wowStore.pipe(select(getMountList));
    this.spinner$ = this.spinnerStore.pipe(select(isSpinnerShowing));

    this.wowStore.select(getMountListLoaded)
      .subscribe(loaded => {
        this.loaded = loaded;
        if (!loaded) {
          this.wowStore.dispatch(new GetMountList());
        }
      });
  }

}
