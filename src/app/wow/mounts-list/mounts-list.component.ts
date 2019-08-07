import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MountList} from '../../api/services/wow.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-mounts-list',
  templateUrl: './mounts-list.component.html',
  styleUrls: ['./mounts-list.component.scss']
})
export class MountsListComponent implements OnInit {

  @Input() mountList: MountList[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(PerfectScrollbarComponent, {static: true}) scrollbar: PerfectScrollbarComponent;

  columns: string[] = ['id', 'name', 'details'];
  dataSource: MatTableDataSource<MountList>;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<MountList>(this.mountList);
    this.dataSource.paginator = this.paginator;
  }
  restartScrollbar() {
    this.scrollbar.directiveRef.scrollToTop();
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
