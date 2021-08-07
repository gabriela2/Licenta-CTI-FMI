import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ad } from '../models/ad';
import { AdsService } from '../services/ads.service';

@Injectable({
  providedIn: 'root'
})
export class PreventEditAdByOtherUsersGuard implements CanActivate {
  ad:Ad;
  currentUserLogged: number;
  adId: number;
  
  constructor(private adService: AdsService,
    private toastrService: ToastrService,) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    
        this.adId = parseInt(route.paramMap.get('id'));
      
      console.log(this.adId);
      this.currentUserLogged = parseInt(localStorage.getItem('userId'));
      return this.adService.getAd(this.adId).pipe(
        map(ad => {
          if (ad.userId==this.currentUserLogged) {
            return true;
          }
          this.toastrService.error('Nu ai acces in  acea zona a aplicatiei !');
        })
      )
    }
  
}
