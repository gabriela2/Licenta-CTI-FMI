import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ad } from '../models/ad';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  getAds(){
    return this.http.get<Ad[]>(this.baseUrl+'ads');
  }
  getAdsByUserId(id:number){
    return this.http.get<Ad[]>(this.baseUrl+'ads/user-ads/'+id);
  }
  getAd(id:number){
    return this.http.get<Ad>(this.baseUrl+'ads/'+id);
  }
  put(id: number, ad: Ad) {
    return this.http.put(this.baseUrl + 'ads/' + id, ad);
  }
  post(ad: any) {
    return this.http.post(this.baseUrl + 'ads', ad);
  }
  setMainPhoto(adId:number,photoId: number) {
    return this.http.put(this.baseUrl + 'ads/set-main-photo/'+adId+'/' + photoId, {});
  }
  deletePhoto(adId:number,photoId: number) {
    return this.http.delete(this.baseUrl + 'ads/delete-photo/'+adId+'/' + photoId);
  }
}
