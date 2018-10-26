import { PaginationActionsUnion, PaginationActionTypes } from '../actions/pagination.actions';

export interface State {
  page: number;
  pageSize: number;
}

export const initialState: State = {
  page: 0,
  pageSize: 10
};

export function reducer(state = initialState,
                        action: PaginationActionsUnion) {
  switch (action.type) {
    case PaginationActionTypes.ChangePage: {
      return {
        ...state, page: action.payload
      };
    }
    case PaginationActionTypes.ChangePageSize: {
      return {
        ...state, pageSize: action.payload
      };
    }
    default:
      return state;
  }
}

export const getPage = (state: State) => state.page;
export const getPageSize = (state: State) => state.pageSize;
