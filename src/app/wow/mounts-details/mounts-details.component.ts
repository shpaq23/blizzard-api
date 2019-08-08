import { Component, OnInit } from '@angular/core';
import {WowState} from '../../store/state/wow.state';
import {select, Store} from '@ngrx/store';
import {SpinnerState} from '../../store/state/spinner.state';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {getMount} from '../../store/selectors/wow.selectors';
import {MountList, WowService} from '../../api/services/wow.service';
import {GetMountDetails} from '../../store/actions/wow.actions';

@Component({
  selector: 'app-mounts-details',
  templateUrl: './mounts-details.component.html',
  styleUrls: ['./mounts-details.component.scss']
})
export class MountsDetailsComponent implements OnInit {

  error$: Observable<string>;
  spinner$: Observable<boolean>;
  mount: MountList;
  mountId: number;

  constructor(private wowStore: Store<WowState>,
              private spinnerStore: Store<SpinnerState>,
              private activatedRoute: ActivatedRoute,
              private wowService: WowService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe( data => {
        this.mountId = +data.id;
        console.log(this.mountId);
        this.wowStore.dispatch(new GetMountDetails(this.mountId));
      });
  }
}
