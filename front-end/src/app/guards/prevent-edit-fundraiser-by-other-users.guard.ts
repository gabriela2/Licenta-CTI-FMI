import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fundraiser } from '../models/fundraiser';
import { FundraisersService } from '../services/fundraisers.service';

@Injectable({
  providedIn: 'root'
})
export class PreventEditFundraiserByOtherUsersGuard implements CanActivate {
  fundraiser:Fundraiser;
  currentUserLogged: number;
  fundraiserId: number;

  constructor(private fundraiserService: FundraisersService,
    private toastrService: ToastrService,) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    
        this.fundraiserId = parseInt(route.paramMap.get('id'));
      
      console.log(this.fundraiserId);
      this.currentUserLogged = parseInt(localStorage.getItem('userId'));
      return this.fundraiserService.getFundraiser(this.fundraiserId).pipe(
        map(fundraiser => {
          if (fundraiser.userId==this.currentUserLogged) {
            return true;
          }
          this.toastrService.error('Nu ai acces in  acea zona a aplicatiei !');
        })
      )
    }
  
}
