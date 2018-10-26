import { Action } from '@ngrx/store';
import { Event } from '../models/events.model';

export enum EventsActionTypes {
  Loaded = '[Events] Loaded',
  Fetch = '[Events] Fetch',
  Delete = '[Events] Delete',
  Update = '[Events] Edit',
  Add = '[Events] Add',
  Upload = '[Events] Upload',
  Uploaded = '[Events] Uploaded',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class Loaded implements Action {
  readonly type = EventsActionTypes.Loaded;

  constructor(public payload: ReadonlyArray<Event>) {}
}

export class Fetch implements Action {
  readonly type = EventsActionTypes.Fetch;
}

export class Delete implements Action {
  readonly type = EventsActionTypes.Delete;

  constructor(public payload: Event) {}
}

export class Update implements Action {
  readonly type = EventsActionTypes.Update;

  constructor(public payload: Event) {}
}

export class Add implements Action {
  readonly type = EventsActionTypes.Add;

  constructor(public payload: Event) {}
}

export class Upload implements Action {
  readonly type = EventsActionTypes.Upload;

  constructor(public payload: string) {}
}

export class Uploaded implements Action {
  readonly type = EventsActionTypes.Uploaded;

  constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type EventsActionsUnion = Loaded
  | Fetch
  | Delete
  | Update
  | Upload
  | Uploaded
  | Add;


