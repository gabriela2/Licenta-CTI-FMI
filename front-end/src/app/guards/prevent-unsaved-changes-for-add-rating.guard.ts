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
      if(component.userRating.rating!=0 || component.userRating.title!='' || component.userRating.comment!=''){
        return confirm('Continui? Modificarile facute vor fi pierdute');
      }
      return true;
    }
  
}
