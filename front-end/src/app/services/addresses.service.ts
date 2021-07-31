import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getAddresses(){
    return this.http.get<Address[]>(this.baseUrl+'addresses');
  }
  getAddress(id:number){
    return this.http.get<Address>(this.baseUrl+'addresses/'+id);
  }
  getAddressByUserId(id:number){
    return this.http.get<Address>(this.baseUrl+'addresses/user-address/'+id);
  }
}
