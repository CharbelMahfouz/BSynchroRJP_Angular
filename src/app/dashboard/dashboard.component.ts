import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as accountActions from '../app-state/actions';
import * as fromRoot from '../app-state';
import { OpenAccountRequest } from '../app-state/http/requests/openAccount.request';
import { User } from '../app-state/entity';
import { NotificationService } from '../_services/notifications/notification.service';
import { ofType } from '@ngrx/effects';
import { OPEN_ACCOUNT_SUCCESS } from '../app-state/actions/accounts.actions';
import { initialState } from '../app-state/reducers/accounts.reduer';
import { Actions } from '@ngrx/effects';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  

  userInfo: User = null;

  constructor(private readonly store: Store,private notifyService : NotificationService) {
   

    this.store.select(fromRoot.getAccounts).pipe(
      takeUntil(this.destroy$),
      filter((state) => state.openAccountresult !== null)
      // skip(1)
    ).subscribe((data : any)  => {
      console.log("state update:",data)
      if(data.openAccountresult == 1) {
        this.notifyService.showSuccess(data.message)
        this.openAccountForm.reset();
      } else {
        console.log("error:",data.message)
        this.notifyService.showError(data.message)
      }
    });
    this.store.select(fromRoot.getAccounts).pipe(
      takeUntil(this.destroy$),
      filter((state) => state.customerInfoResult !== null)
    ).subscribe(data => {
      this.userInfo = data.userInfo
      if(!this.userInfo) {
        this.notifyService.showError("Customer not found")
      }
    });
  }

  openAccountForm = new FormGroup({
    userID: new FormControl('', Validators.nullValidator && Validators.required),
    initialCredit: new FormControl('', Validators.nullValidator && Validators.required),
    
  });

  customerDetailsForm = new FormGroup({
    userID: new FormControl('', Validators.nullValidator && Validators.required),    
  });

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit() {
    console.log(this.openAccountForm.value);
    const request : OpenAccountRequest = {
       customerId: this.openAccountForm.value.userID,
      initialCredit: this.openAccountForm.value.initialCredit,
     
    };
    console.log("request:",request)
    this.store.dispatch(accountActions.openAccount({request}));
   
  }

  getCustomerDetailsSubmit() {
    console.log(this.customerDetailsForm.value);

    this.store.dispatch(accountActions.getUserInfo({id:this.customerDetailsForm.value.userID}));
   
  }

 

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    
  }

}
