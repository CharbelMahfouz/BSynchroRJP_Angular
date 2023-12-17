import { Action, createReducer, on } from '@ngrx/store';
import {  User } from '../entity';
import * as accountsActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../state/storage';

export interface State {
 userInfo: User
  message?: string;
  isLoading?: boolean;
  openAccountresult?:number;
  customerInfoResult?:number;
  result:number
}

export const initialState: State = {
  userInfo: null,
  message: '',
  isLoading: false,
  openAccountresult :null,
  result:0,
  customerInfoResult : null
};

const accountsReducer = createReducer(
  initialState,

  // get user reducers
  on(accountsActions.getUserInfo, (state,id) => ({...state, isLoading: true,openAccountresult:null})),
  on(accountsActions.getUserInfoSuccess, (state, {resp}) => ({...state,userInfo:resp.data, isLoading: false,customerInfoResult:resp.result})),

 // open account reducers
  on(accountsActions.openAccount, (state, {request}) => ({...state, isLoading: true,customerInfoResult:null})),
  on(accountsActions.openAccountSuccess, (state, resp) => ({...state,openAccountresult : resp.result,message:resp.message})),

 
 
);

export function reducer(state: State | undefined, action: Action): any {
  return accountsReducer(state, action);
}

export const getAccounts = (state: State) => {
  console.log("get acc state called")
  return {
    ...state
  };
};
