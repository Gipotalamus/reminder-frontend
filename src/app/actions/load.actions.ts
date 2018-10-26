import { Action } from '@ngrx/store';

export enum LoadActionTypes {
  Loaded = '[Load] Loaded',
  Loading = '[Load] Loading'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class Loaded implements Action {
  readonly type = LoadActionTypes.Loaded;
}

export class Loading implements Action {
  readonly type = LoadActionTypes.Loading;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type LoadActionsUnion = Loaded
  | Loading;


