import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private toastrService: ToastrService){}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user =>{
        if(user){
          return true;
        }
        this.toastrService.error('Pentru a putea accesa aceasta componenta a aplicatiei trebuie sa fii autentificat!');
      })
    )
  }
  
}
