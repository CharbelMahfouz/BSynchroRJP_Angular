import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import * as fromAccounts from './reducers/accounts.reduer';

export interface State {
  accounts: fromAccounts.State
}

export const reducers: ActionReducerMap<State> = {

  accounts: fromAccounts.reducer,
};

const reducerKeys = ['accounts'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];





// Todo reducers Begin

export const getAccountsState = createFeatureSelector<fromAccounts.State>('accounts');

export const getAccounts = createSelector(
  getAccountsState,
  fromAccounts.getAccounts
);
