import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavouriteList } from '../models/favouriteList';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  deleteFavouriteList(id:number){
    return this.http.delete(this.baseUrl+'favouriteLists/'+id);
  }
  postFavouriteList(favouriteList: FavouriteList) {
    return this.http.post(this.baseUrl + 'favouriteLists/', favouriteList);
  }
  getFavouriteLists(id:number){
    return this.http.get<FavouriteList[]>(this.baseUrl+'favouriteLists/'+id);
  }

  getFavouriteAd(userId:number,adId:number){
    return this.http.get<FavouriteList>(this.baseUrl+'favouriteLists/get-ad/'+userId+'/'+adId);
  }
  getFavouriteFundraiser(userId:number,fundraiserId:number){
    return this.http.get<FavouriteList>(this.baseUrl+'favouriteLists/get-fundraiser/'+userId+'/'+fundraiserId);
  }

}
