import { Action } from '@ngrx/store';
import { Event } from '../models/events.model';

export enum PaginationActionTypes {
  ChangePage = '[Pagination] Change Page',
  ChangePageSize = '[Pagination] Change Page Size',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class ChangePage implements Action {
  readonly type = PaginationActionTypes.ChangePage;

  constructor(public payload: number) {}
}

export class ChangePageSize implements Action {
  readonly type = PaginationActionTypes.ChangePageSize;

  constructor(public payload: number) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PaginationActionsUnion =
  ChangePage
  | ChangePageSize;


