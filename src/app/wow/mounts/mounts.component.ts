import { Component, OnInit } from '@angular/core';
import {WowService} from '../../api/services/wow.service';

@Component({
  selector: 'app-mounts',
  templateUrl: './mounts.component.html',
  styleUrls: ['./mounts.component.scss']
})
export class MountsComponent implements OnInit {

  constructor(private wowService: WowService) { }

  ngOnInit() {
    this.wowService.getMountList()
      .subscribe(data => console.log(data));
  }

}
