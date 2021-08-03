import { HttpClient } from '@angular/common/http';
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
  constructor(private http:HttpClient) { }

  createConnectedExpressAccount(id:number){
    return this.http.post(this.baseUrl+'Stripe/CreateConnectedExpressAccount/'+id,{}).pipe(map((response:any)=>response));
  }
  getListOfPayments(){
    return this.http.get(this.baseUrl+'Stripe/GetPayments');
  }

  createPayment(payment:Payment){
    payment.amount = Number.parseFloat(payment.amount.toString());
    const data = JSON.stringify(payment);
    return this.http.post(this.baseUrl+'Stripe/CreateCharges',data).subscribe();
  }

  transferPayment(payment:Transfer){
    payment.amount=Number.parseFloat(payment.amount.toString());
    return this.http.post(this.baseUrl+'Stripe/TransferPayment',payment).subscribe();
  }

  refundPayment(chargeId:string){
    const data = JSON.stringify(chargeId);
    return this.http.post(this.baseUrl+'Stripe/RefundPayment', data).subscribe();
  }
}
