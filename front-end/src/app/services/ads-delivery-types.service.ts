import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ad_x_DeliveryType } from '../models/ad_x_deliveryType';

@Injectable({
  providedIn: 'root'
})
export class AdsDeliveryTypesService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAdsDeliveriesTypes() {
    return this.http.get<Ad_x_DeliveryType[]>(this.baseUrl + 'AdsDeliveryTypes');
  }
  getAdDeliveryType(id: number) {
    return this.http.get<Ad_x_DeliveryType>(this.baseUrl + 'AdsDeliveryTypes/' + id);
  }
  post(adDeliveryType: Ad_x_DeliveryType) {
    return this.http.post(this.baseUrl + 'AdsDeliveryTypes/', adDeliveryType);
  }
  put(id: number, adDeliveryType: Ad_x_DeliveryType) {
    return this.http.put(this.baseUrl + 'AdsDeliveryTypes/' + id, adDeliveryType);
  }
  delete(id:number){
    return this.http.delete(this.baseUrl+'AdsDeliveryTypes/'+id);
  }
}
