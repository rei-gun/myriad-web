import {HYDRATE} from 'next-redux-wrapper';

import {PaginationState as BasePaginationState} from '../base/state';
import {Actions} from './actions';
import * as constants from './constants';

import * as Redux from 'redux';
import {Comment} from 'src/interfaces/comment';
import {Post} from 'src/interfaces/post';
import {Transaction, TransactionDetail} from 'src/interfaces/transaction';

export interface TipSummaryState extends BasePaginationState {
  post: Post | null;
  comment: Comment | null;
  show: boolean;
  transactions: Transaction[];
  summary: TransactionDetail[];
}

const initialState: TipSummaryState = {
  post: null,
  comment: null,
  loading: false,
  show: false,
  transactions: [],
  summary: [],
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItemCount: 0,
    totalPageCount: 0,
  },
};

export const TipSummaryReducer: Redux.Reducer<TipSummaryState, Actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case HYDRATE: {
      return action.payload.tipSummaryState;
    }

    case constants.SET_TIPPED_POST: {
      return {
        ...state,
        post: action.payload,
        show: true,
      };
    }

    case constants.FETCH_TRANSACTION_HISTORY: {
      return {
        ...state,
        transactions: action.transactions,
        meta: action.meta,
        hasMore: action.meta.currentPage < action.meta.totalPageCount,
      };
    }

    case constants.FETCH_TRANSACTION_SUMMARY: {
      return {
        ...state,
        summary: action.summary,
      };
    }

    case constants.SET_TIPPED_COMMENT: {
      return {
        ...state,
        comment: action.payload,
      };
    }

    case constants.FETCH_TRANSACTION_HISTORY_FOR_COMMENT: {
      return {
        ...state,
        transactions: action.transactions,
        meta: action.meta,
        hasMore: action.meta.currentPage < action.meta.totalPageCount,
      };
    }

    case constants.FETCH_TRANSACTION_SUMMARY_FOR_COMMENT: {
      return {
        ...state,
        summary: action.summary,
        show: true,
      };
    }

    case constants.CLEAR_TIPPED_CONTENT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
