import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../models/pagination';
import { UserRating } from '../models/userRating';

@Injectable({
  providedIn: 'root'
})
export class UserRatingsService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<UserRating[]> = new PaginatedResult<UserRating[]>();
  constructor(private http: HttpClient) { }

  getUserRatings() {
    return this.http.get<UserRating[]>(this.baseUrl + 'userRatings');
  }


  getUserRating(id:number) {
    return this.http.get<UserRating>(this.baseUrl + 'userRatings/'+id);
  }

  getUserRatingByReceiverIdWithoutPag(id:number) {
    return this.http.get<UserRating[]>(this.baseUrl + 'userRatings/rating-received-without-pag/'+id);
  }



  getUserRatingsByReceiverId(id: number,page?: number, itemsPerPage?: number, orderBy?:string, rating?:number) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
      params = params.append('orderBy',orderBy);
      params = params.append('rating',rating.toString());
    }

    
    return this.http.get<UserRating[]>(this.baseUrl +'userRatings/rating-received/' + id, { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;

      }
      ));
  }



  post(userRating: UserRating) {
    return this.http.post(this.baseUrl + 'userRatings/', userRating);
  }

  put(id: number, userRating: UserRating) {
    return this.http.put(this.baseUrl + 'userRatings/' + id, userRating);
  }
  delete(id:number){
    return this.http.delete(this.baseUrl+'userRatings/'+id);
  }
}
