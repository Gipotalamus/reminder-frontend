import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Add, Delete, EventsActionTypes, Loaded, Update, Uploaded } from '../actions/events.actions';
import { empty } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers/events';
import { HttpDataService } from '../services/http.data.service';
import { Event } from '../models/events.model';
import { getEvents } from '../reducers';

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
      (action: Delete, response) => ({payload: action.payload, response})),
    withLatestFrom(this.store.pipe(select(getEvents))),
    map(arr => arr[0].response['n'] === 1 ?
      new Loaded(arr[1].filter((event: Event) => event._id !== arr[0].payload._id)) : new Loaded(arr[1])),
    catchError(error => { console.error(error); return empty(); })
  );

  @Effect() add$ = this.actions$.pipe(
    ofType(EventsActionTypes.Add),
    switchMap((action: Add) => this.dataService.addEvent(action.payload),
      (action: Add, response) => ({payload: action.payload, response})),
    withLatestFrom(this.store.pipe(select(getEvents))),
    map(arr => arr[0].response['_id'] ?
      new Loaded([...arr[1], {...arr[0].payload, _id: arr[0].response['_id']}]) : new Loaded(arr[1])),
    catchError(error => { console.error(error); return empty(); })
  );

  @Effect() update$ = this.actions$.pipe(
    ofType(EventsActionTypes.Update),
    switchMap((action: Update) => this.dataService.updateEvent(action.payload),
      (action: Update, response) => ({payload: action.payload, response})),
    withLatestFrom(this.store.pipe(select(getEvents))),
    map(arr => arr[0].response['n'] === 1 ?
      new Loaded(arr[1].map((event: Event) => event._id === arr[0].payload._id ? arr[0].payload : event)) : new Loaded(arr[1])),
    catchError(error => { console.error(error); return empty(); })
  );

  @Effect() uploadFiles$ = this.actions$.pipe(
    ofType(EventsActionTypes.Upload),
    switchMap((action: Uploaded) => {
      return this.dataService.uploadFiles(action.payload);
    }),
    map(response => new Uploaded('')),
    catchError(error => { console.error(error); return empty(); })
  );

  constructor(private actions$: Actions,
              private store: Store<State>,
              private dataService: HttpDataService) {
  }
}
