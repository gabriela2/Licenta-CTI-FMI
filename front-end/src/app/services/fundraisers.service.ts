import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fundraiser } from '../models/fundraiser';

@Injectable({
  providedIn: 'root'
})
export class FundraisersService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  getFundraisers(){
    return this.http.get<Fundraiser[]>(this.baseUrl+'fundraisers');
  }
  getFundraiser(id:number){
    return this.http.get<Fundraiser>(this.baseUrl+'fundraisers/'+id);
  }
  getFundraisersByUserId(id:number){
    return this.http.get<Fundraiser[]>(this.baseUrl+'fundraisers/user-fundraisers/'+id);
  }
  put(id: number, fundraiser:Fundraiser) {
    return this.http.put(this.baseUrl + 'fundraisers/' + id, fundraiser);
  }
}
