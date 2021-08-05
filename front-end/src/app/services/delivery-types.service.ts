import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeliveryType } from '../models/deliveryType';

@Injectable({
  providedIn: 'root'
})
export class DeliveryTypesService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getDeliveryTypes() {
    return this.http.get<DeliveryType[]>(this.baseUrl + 'deliveryTypes');
  }
  getDeliveryType(id: number) {
    return this.http.get<DeliveryType>(this.baseUrl + 'deliveryTypes/' + id);
  }
  post(deliveryType: DeliveryType) {
    return this.http.post(this.baseUrl + 'deliveryTypes/', deliveryType);
  }
  put(id: number, deliveryType: DeliveryType) {
    return this.http.put(this.baseUrl + 'deliveryTypes/' + id, deliveryType);
  }
  delete(id:number){
    return this.http.delete(this.baseUrl+'deliveryTypes/'+id);
  }
}
