import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  length: number;

  @Input()
  pageIndex: number;

  @Input()
  pageSize: number;

  @Output()
  changePage: EventEmitter<number> = new EventEmitter();

  @Output()
  changePageSize: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChangePage(pageEvent: PageEvent): void {
    if (pageEvent.pageIndex !== this.pageIndex) {
      this.changePage.emit(pageEvent.pageIndex);
    }
    if (pageEvent.pageSize !== this.pageSize) {
      this.changePageSize.emit(pageEvent.pageSize);
    }
  }

}
