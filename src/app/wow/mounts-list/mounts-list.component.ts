import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MountList} from '../../api/services/wow.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-mounts-list',
  templateUrl: './mounts-list.component.html',
  styleUrls: ['./mounts-list.component.scss']
})
export class MountsListComponent implements OnChanges {

  @Input() mountList: MountList[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(PerfectScrollbarComponent, {static: true}) scrollbar: PerfectScrollbarComponent;
  @ViewChild('input', {static: true}) input: ElementRef;

  columns: string[] = ['id', 'name', 'portrait', 'details'];
  dataSource: MatTableDataSource<MountList>;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<MountList>(this.mountList);
    this.dataSource.paginator = this.paginator;
    if (this.input.nativeElement.value) {
      this.dataSource.filter = this.input.nativeElement.value.trim().toLowerCase();
    }
  }

  restartScrollbar() {
    this.scrollbar.directiveRef.scrollToTop();
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.scrollbar.directiveRef.scrollToTop();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
