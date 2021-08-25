import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MembersService } from '../services/members.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailGuard implements CanActivate {
  currentUserLogged:number;
  constructor(private authService:AuthService,private memberServevice:MembersService, private toastrService: ToastrService, private router:Router,){}

  canActivate() {
    this.currentUserLogged = parseInt(localStorage.getItem('userId'));
      return this.memberServevice.getMember(this.currentUserLogged).pipe(
        map(member => {
          if (member.emailConfirmed===true) {
            return true;
          }else{
            this.router.navigateByUrl("not-confirmed");
          }
        })
      )
  }
  
}
