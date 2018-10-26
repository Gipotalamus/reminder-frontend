import * as fromEvents from './events';
import * as fromLoad from './load';
import * as fromPagination from './pagination';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  events: fromEvents.State;
  load: fromLoad.State;
  pagination: fromPagination.State;
}

export const reducers: ActionReducerMap<State> = {
  events: fromEvents.reducer,
  load: fromLoad.reducer,
  pagination: fromPagination.reducer
};

export const getEventsState = createFeatureSelector<fromEvents.State>('events');
export const getLoadState = createFeatureSelector<fromLoad.State>('load');
export const getPaginationState = createFeatureSelector<fromPagination.State>('pagination');

export const getPage = createSelector(getPaginationState, fromPagination.getPage);
export const getPageSize = createSelector(getPaginationState, fromPagination.getPageSize);

export const getEvents = createSelector(getEventsState, getPage, getPageSize, fromEvents.getEvents);
export const getEventsLength = createSelector(getEventsState, fromEvents.getEventsLength);

export const getLoading = createSelector(getLoadState, fromLoad.getLoad);


