import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Loaded, Loading } from '../actions/load.actions';
import { EventsActionTypes } from '../actions/events.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadEffects {

  @Effect() loading$ = this.actions$.pipe(
    ofType(EventsActionTypes.Upload),
    map(() => new Loading()),
    catchError(error => { console.error(error); return empty(); })
  );

  @Effect() loaded$ = this.actions$.pipe(
    ofType(EventsActionTypes.Uploaded, EventsActionTypes.Loaded),
    map(() => new Loaded()),
    catchError(error => { console.error(error); return empty(); })
  );

  constructor(private actions$: Actions) {
  }
}
