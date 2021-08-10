import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddRatingComponent } from '../ratings/add-rating/add-rating.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesForAddRatingGuard implements CanDeactivate<unknown> {

    canDeactivate(
      component: AddRatingComponent): Observable<boolean> | boolean  {
      
        
      
      return true;
    }
  
}
