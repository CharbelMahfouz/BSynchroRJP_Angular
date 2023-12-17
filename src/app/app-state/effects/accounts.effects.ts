import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import * as accountActions from '../actions';
import { AccountsService } from 'src/app/_services';

@Injectable()
export class AccountsEffects {

  constructor(
    private actions$: Actions,
    private accountsService: AccountsService
  ) {}

  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountActions.getUserInfo),
      exhaustMap(action =>
        this.accountsService.getCustomerInfo(action.id).pipe(
          map((response:any) => {
            console.log("response:::", response)
            return accountActions.getUserInfoSuccess({resp:response})
          }),
          catchError((error: any) => of(accountActions.getUserInfoFailure(error))))
      )
    )
  );

  openAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountActions.openAccount),
      exhaustMap(action =>
       
        this.accountsService.openAccount(action.request).pipe(
          map(response => accountActions.openAccountSuccess(response)),
          catchError((error: any) => of(accountActions.openAccountFailure(error))))
      )
    )
  );


  

}
