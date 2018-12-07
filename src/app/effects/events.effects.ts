import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Add, Delete, EventsActionTypes, Loaded, Update, Upload, Uploaded } from '../actions/events.actions';
import { empty } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers/events';
import { HttpDataService } from '../services/http.data.service';
import { Event } from '../models/events.model';
import { getAllEvents, getPage, getPageSize } from '../reducers';
import { ChangePage } from '../actions/pagination.actions';
import { EventResponse } from '../models/http.model';

@Injectable()
export class EventsEffects {

  @Effect() get$ = this.actions$.pipe(
    ofType(EventsActionTypes.Fetch),
    switchMap(() => this.dataService.getEvents()),
    map((events: ReadonlyArray<Event>) => new Loaded(events)),
    catchError(error => { console.error(error); return empty(); })
  );

  @Effect() delete$ = this.actions$.pipe(
    ofType(EventsActionTypes.Delete),
    switchMap((action: Delete) => this.dataService.deleteEvent(action.payload),
      (action: Delete, response: EventResponse) => ({payload: action.payload, response})),
    withLatestFrom(this.store.pipe(select(getAllEvents)), (res, events) => ({...res, events})),
    withLatestFrom(this.store.pipe(select(getPage)), (res, page) => ({...res, page})),
    withLatestFrom(this.store.pipe(select(getPageSize)), (res, pageSize) => ({...res, pageSize})),
    switchMap(({response, payload, events, page, pageSize}) => {
      if (response.n === 1) {
        const filteredEvents = events.filter((event: Event) => event._id !== payload._id);
        if (events.length - page * pageSize === 1 && page !== 0) {
          return [new Loaded(filteredEvents), new ChangePage(page - 1)];
        }
        return [new Loaded(filteredEvents)];
      }
      return [new Loaded(events)];
    }),
    catchError(error => { console.error(error); return empty(); })
  );

  @Effect() add$ = this.actions$.pipe(
    ofType(EventsActionTypes.Add),
    switchMap((action: Add) => this.dataService.addEvent(action.payload),
      (action: Add, event: Event) => ({payload: action.payload, event})),
    withLatestFrom(this.store.pipe(select(getAllEvents)), (res, events: ReadonlyArray<Event>) => ({...res, events})),
    map(({payload, event, events}) => event._id ?
      new Loaded([...events, {...payload, _id: event._id}]) : new Loaded(events)),
    catchError(error => { console.error(error); return empty(); })
  );

  @Effect() update$ = this.actions$.pipe(
    ofType(EventsActionTypes.Update),
    switchMap((action: Update) => this.dataService.updateEvent(action.payload),
      (action: Update, response: EventResponse) => ({payload: action.payload, response})),
    withLatestFrom(this.store.pipe(select(getAllEvents)), (res, events: ReadonlyArray<Event>) => ({...res, events})),
    map(({payload, response, events}) => response.n === 1 ?
      new Loaded(events.map((event: Event) => event._id === payload._id ? payload : event)) : new Loaded(events)),
    catchError(error => { console.error(error); return empty(); })
  );

  @Effect() uploadFile$ = this.actions$.pipe(
    ofType(EventsActionTypes.Upload),
    withLatestFrom(this.store.pipe(select(getAllEvents)), (action: Upload, events: ReadonlyArray<Event>) => ({...action, events})),
    switchMap(({payload}) => this.dataService.uploadFile(payload), (res, response: ReadonlyArray<Event>) => ({...res, response})),
    switchMap(({response, events}) => [new Uploaded(''), new Loaded([...events, ...<ReadonlyArray<Event>>response])]),
    catchError(error => { console.error(error); return empty(); })
  );

  constructor(private actions$: Actions,
              private store: Store<State>,
              private dataService: HttpDataService) {
  }
}
