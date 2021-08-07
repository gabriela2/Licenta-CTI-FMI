import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { Transfer } from '../models/transfer';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createConnectedExpressAccount(id: number) {
    return this.http.post(this.baseUrl + 'Stripe/express-account/' + id, {});
  }

  createPayment(payment: Payment) {
    return this.http.post(this.baseUrl + 'Stripe/charge', payment);
  }

  transferPayment(payment: Transfer) {
    return this.http.post(this.baseUrl + 'Stripe/transfer', payment);
  }

}
