import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { Transfer } from '../models/transfer';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  postExpressAccount(id: number) {
    return this.http.post(this.baseUrl + 'Stripe/express-account/' + id, {});
  }

  postCharge(payment: Payment) {
    return this.http.post(this.baseUrl + 'Stripe/charge', payment);
  }

  postTransfer(transfer: Transfer) {
    return this.http.post(this.baseUrl + 'Stripe/transfer', transfer);
  }

}
