import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRating } from '../models/userRating';

@Injectable({
  providedIn: 'root'
})
export class UserRatingsService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserRatings() {
    return this.http.get<UserRating[]>(this.baseUrl + 'userRatings');
  }
  getUserRating(id:number) {
    return this.http.get<UserRating>(this.baseUrl + 'userRatings/'+id);
  }
  getUserRatingsByReceiverId(id: number) {
    return this.http.get<UserRating[]>(this.baseUrl + 'userRatings/rating-received/' + id);
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
