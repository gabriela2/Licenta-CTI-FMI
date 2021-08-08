import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Donation } from '../models/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  
  post(donation: Donation) {
    return this.http.post(this.baseUrl + 'donations/', donation);
  }
  getDonationsByUserId(id:number){
    return this.http.get<Donation[]>(this.baseUrl+'donations/'+id);
  }
}
