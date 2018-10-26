import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import { Observable, Subscription } from 'rxjs';
import { HttpDataService } from './services/http.data.service';
import { Event } from './models/events.model';
import { select, Store } from '@ngrx/store';
import * as fromEvents from './reducers/events';
import { Add, Delete, Fetch, Update, Upload } from './actions/events.actions';
import { getEvents, getEventsLength, getLoading, getPage, getPageSize } from './reducers';
import { ChangePage, ChangePageSize } from './actions/pagination.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  modalSubscription: Subscription;
  events$: Observable<ReadonlyArray<Event>> = this.store.pipe(select(getEvents));
  loading$: Observable<boolean> = this.store.pipe(select(getLoading));
  page$: Observable<number> = this.store.pipe(select(getPage));
  pageSize$: Observable<number> = this.store.pipe(select(getPageSize));
  eventsLength$: Observable<number> = this.store.pipe(select(getEventsLength));

  constructor(private dialog: MatDialog, private dataService: HttpDataService, private store: Store<fromEvents.State>) {}

  openAddModal(): void {
    const modalRef = this.dialog.open(ModalComponent, {data: {title: 'Add event'}});
    this.modalSubscription = modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEvent(result);
      }
    });
  }

  openEditModal(event: Event): void {
    const modalRef = this.dialog.open(ModalComponent, {data: {title: 'Edit event', event}});
    this.modalSubscription = modalRef.afterClosed().subscribe(result => {
      if (!this.isEqualEvents(event, result)) {
        this.updateEvent({...result, _id: event._id});
      }
    });
  }

  uploadFile(file: string): void {
    this.store.dispatch(new Upload(file));
  }

  ngOnInit(): void {
    this.store.dispatch(new Fetch());
  }

  addEvent(event: Event): void {
    this.store.dispatch(new Add(event));
  }

  deleteEvent(event: Event): void {
    this.store.dispatch(new Delete(event));
  }

  updateEvent(event: Event): void {
    this.store.dispatch(new Update(event));
  }

  changePage(page: number): void {
    this.store.dispatch(new ChangePage(page));
  }

  changePageSize(size: number): void {
    this.store.dispatch(new ChangePageSize(size));
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  isEqualEvents(e1: Event, e2: Event): boolean {
    return e1.name === e2.name && e1.description === e2.description && e1.type === e2.type && e1.date === e2.date;
  }
}
