import { Event } from '../models/events.model';
import { EventsActionsUnion, EventsActionTypes } from '../actions/events.actions';

export interface State {
  events: ReadonlyArray<Event>;
}

export const initialState: State = {
  events: []
};

export function reducer(state = initialState,
                        action: EventsActionsUnion) {
  switch (action.type) {
    case EventsActionTypes.Loaded: {
      return {
        events: [...action.payload]
      };
    }
    default:
      return state;
  }
}

export const getEvents = (state: State, page: number, pageSize: number) => state.events.slice(page * pageSize, (page + 1) * pageSize);
export const getEventsLength = (state: State) => state.events.length;
