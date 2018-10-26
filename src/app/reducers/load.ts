import { LoadActionsUnion, LoadActionTypes } from '../actions/load.actions';

export interface State {
  loading: boolean;
}

export const initialState: State = {
  loading: true
};

export function reducer(state = initialState,
                        action: LoadActionsUnion) {
  switch (action.type) {
    case LoadActionTypes.Loaded: {
      return {
        loading: false
      };
    }
    case LoadActionTypes.Loading: {
      return {
        loading: true
      };
    }
    default:
      return state;
  }
}

export const getLoad = (state: State) => state.loading;
