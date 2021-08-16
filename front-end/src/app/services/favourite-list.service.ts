import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FavouriteList } from '../models/favouriteList';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<FavouriteList[]> = new PaginatedResult<FavouriteList[]>();
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

  getFavouriteListByUserId(id:number, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    
    return this.http.get<FavouriteList[]>(this.baseUrl + 'favouriteLists/list/'+id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }

}
