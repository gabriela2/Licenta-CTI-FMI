import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRating } from '../models/userRating';
import { UserRatingsService } from '../services/user-ratings.service';

@Injectable({
  providedIn: 'root'
})
export class PreventEditReviewByOtherUsersGuard implements CanActivate {

  userRating: UserRating;
  currentUserLogged: number;
  userRatingId: number;
  senderId: number;

  constructor(private userRatingService: UserRatingsService,
    private toastrService: ToastrService,) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    
        this.userRatingId = parseInt(route.paramMap.get('id'));
      
      console.log(this.userRatingId);
      this.currentUserLogged = parseInt(localStorage.getItem('userId'));
      return this.userRatingService.getUserRating(this.userRatingId).pipe(
        map(userRating => {
          if (userRating.senderId==this.currentUserLogged) {
            return true;
          }
          this.toastrService.error('Nu ai acces in  acea zona a aplicatiei !');
        })
      )
    }
}



