import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OpenAccountRequest } from '../app-state/http/requests/openAccount.request';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  rootURL = environment.apiUrl;

  getCustomerInfo(customerId:number) {
    return this.http.get(`${this.rootURL}/customers/GetCustomerDetails/${customerId}`);
  }

  openAccount(req: OpenAccountRequest) {
    console.log("axtion.req:",req)
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.rootURL}/accounts/openAccount`,req,{headers});
  }

  
}
