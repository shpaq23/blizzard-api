import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MountList} from '../../api/services/wow.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {PerfectScrollbarConfigInterface, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-mounts-list',
  templateUrl: './mounts-list.component.html',
  styleUrls: ['./mounts-list.component.scss']
})
export class MountsListComponent implements OnInit {

  @Input() mountList: MountList[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(PerfectScrollbarDirective, {static: true}) scrollbar: PerfectScrollbarDirective;

  columns: string[] = ['id', 'name', 'details'];
  dataSource: MatTableDataSource<MountList>;
  scrollBarConfig: PerfectScrollbarConfigInterface = {
    scrollXMarginOffset: 1000,
    suppressScrollX: true
  };

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<MountList>(this.mountList);
    this.dataSource.paginator = this.paginator;
    console.log(this.scrollbar);
    setTimeout(() => {
      this.scrollbar.scrollToTop();
    }, 2000);
  }

}
