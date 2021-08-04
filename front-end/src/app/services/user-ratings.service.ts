import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRating } from '../models/userRating';

@Injectable({
  providedIn: 'root'
})
export class UserRatingsService {

  userRatings: UserRating[]=[];


  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserRatings() {
    if(this.userRatings.length>0) return of(this.userRatings);
    return this.http.get<UserRating[]>(this.baseUrl + 'userRatings').pipe(
      map(userRatings =>{
        this.userRatings = userRatings;
        return userRatings;
      })
    )
  }


  getUserRating(id:number) {
    const userRating= this.userRatings.find(x=>x.id=== id);
    if(userRating !== undefined) return of(userRating);
    return this.http.get<UserRating>(this.baseUrl + 'userRatings/'+id);
  }

  getUserRatingsByReceiverId(id: number) {
    return this.http.get<UserRating[]>(this.baseUrl + 'userRatings/rating-received/' + id).pipe(
      map(userRatings =>{
        this.userRatings = userRatings;
        return userRatings;
      })
    );
  }
  post(userRating: UserRating) {
    return this.http.post(this.baseUrl + 'userRatings/', userRating);
  }
  put(id: number, userRating: UserRating) {
    return this.http.put(this.baseUrl + 'userRatings/' + id, userRating).pipe(
      map(()=> {
        const index = this.userRatings.indexOf(userRating);
        this.userRatings[index] = userRating;
      })
    );
  }
  delete(id:number){
    return this.http.delete(this.baseUrl+'userRatings/'+id);
  }
}
