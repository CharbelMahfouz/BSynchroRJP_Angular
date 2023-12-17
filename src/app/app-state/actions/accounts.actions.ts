import { createAction, props } from '@ngrx/store';
import { OpenAccountRequest } from '../http/requests/openAccount.request';

export const GET_USER_INFO = '[Accounts] Get User Info';
export const GET_USER_INFO_SUCCESS = '[Accounts] Get User Info Success';
export const GET_USER_INFO_FAIL = '[Accounts] Get User Info Failure';

export const OPEN_ACCOUNT = '[Accounts] Open Account';
export const OPEN_ACCOUNT_SUCCESS = '[Accounts] Open Account Success';
export const OPEN_ACCOUNT_FAIL = '[Accounts] Open Account Failure';



export const getUserInfo = createAction(
  GET_USER_INFO,
  props<{id: number}>()
);

export const getUserInfoSuccess = createAction(
  GET_USER_INFO_SUCCESS,
  props<{resp}>()
);

export const getUserInfoFailure = createAction(
  GET_USER_INFO_FAIL,
  props<{any}>()
);

export const openAccount = createAction(
  OPEN_ACCOUNT,
  props<{request: OpenAccountRequest}>()
);

export const openAccountSuccess = createAction(
  OPEN_ACCOUNT_SUCCESS,
  props<any>()
);

export const openAccountFailure = createAction(
  OPEN_ACCOUNT_FAIL,
  props<any>()
);


